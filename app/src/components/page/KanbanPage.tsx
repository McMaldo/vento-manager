import React, { useState, useRef, useEffect } from "react";
import FaIcon from "../atom/FaIcon";
import type { Column } from "../../types/column";
import type { Part } from "../../types/part";
import KanbanCol from "../template/KanbanCol";

interface ColumnMenuPosition {
  columnId: string;
  top: number;
  left: number;
}

interface KanbanPageProps {
  columns: Column[];
}

const KanbanPage: React.FC<KanbanPageProps> = ({ columns }) => {
  const [activeMenu, setActiveMenu] = useState<ColumnMenuPosition | null>(null);
  const [showColumnVisible, setShowColumnVisible] = useState<{
    [key: string]: boolean;
  }>({
    pedidos: true,
    proceso: true,
    almacen: true,
    demorados: true,
  });

  const menuRef = useRef<HTMLDivElement>(null);

  // CSV drop / preview state
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  // util: parser CSV simple (maneja comillas)
  const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let cur = "";
    let row: string[] = [];
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (ch === '"') {
        if (inQuotes && next === '"') {
          // escaped quote
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (!inQuotes && ch === ",") {
        row.push(cur);
        cur = "";
        continue;
      }
      if (!inQuotes && (ch === "\n" || ch === "\r")) {
        // handle CRLF
        if (ch === "\r" && next === "\n") {
          // skip \n in next iteration
        }
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
        // skip lone \r or \n handling continues
        continue;
      }
      cur += ch;
    }
    // final push
    if (cur !== "" || inQuotes || row.length > 0) {
      row.push(cur);
      rows.push(row);
    }
    return rows;
  };

  // Drag & drop handlers para CSV
  const handleDragOverFile = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) setIsDraggingFile(true);
  };

  const handleDragLeaveFile = () => {
    setIsDraggingFile(false);
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    setCsvError(null);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (
      !file.name.toLowerCase().endsWith(".csv") &&
      !file.type.includes("csv") &&
      !file.type.startsWith("text")
    ) {
      setCsvError("Solo se aceptan archivos .csv");
      setCsvPreview(null);
      setCsvFileName(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      try {
        const rows = parseCSV(text);
        setCsvPreview(rows.slice(0, 200)); // limitar preview
        setCsvFileName(file.name);
      } catch (err) {
        setCsvError("Error al parsear CSV");
        setCsvPreview(null);
        setCsvFileName(null);
      }
    };
    reader.onerror = () => {
      setCsvError("No se pudo leer el archivo");
      setCsvPreview(null);
      setCsvFileName(null);
    };
    reader.readAsText(file, "UTF-8");
  };

  const toggleColumnMenu = (
    columnId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();

    if (activeMenu?.columnId === columnId) {
      setActiveMenu(null);
    } else {
      setActiveMenu({
        columnId,
        top: rect.bottom + 8,
        left: rect.left - 200, // Ajustar para que aparezca a la izquierda del botón
      });
    }
  };

  const toggleColumnVisibility = (columnId: string) => {
    setShowColumnVisible((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
    setActiveMenu(null);
  };

  const [cols, setCols] = useState<Column[]>(columns);
  const handleMovePart = (
    partId: string,
    fromColumnId: string,
    toColumnId: string,
  ) => {
    setCols((cols) => {
      const fromIdx = cols.findIndex((c) => c.id === fromColumnId);
      const toIdx = cols.findIndex((c) => c.id === toColumnId);
      if (fromIdx === -1 || toIdx === -1) return cols;

      const fromCol = { ...cols[fromIdx], parts: [...cols[fromIdx].parts] };
      const toCol = { ...cols[toIdx], parts: [...cols[toIdx].parts] };

      const partIndex = fromCol.parts.findIndex((p) => p.id === partId);
      if (partIndex === -1) return cols;

      const [moved] = fromCol.parts.splice(partIndex, 1);
      toCol.parts.unshift(moved);

      const newCols = [...cols];
      newCols[fromIdx] = fromCol;
      newCols[toIdx] = toCol;
      return newCols;
    });
  };
  const addPartToFirstColumn = (newPart: Part) => {
    setCols((prev) =>
      prev.map((col, index) =>
        index === 0 ? { ...col, parts: [newPart, ...col.parts] } : col,
      ),
    );
  };
  const csvClose = () => {
    setCsvPreview(null);
    setCsvFileName(null);
    setCsvError(null);
  };
  const csvSaveContent = () => {
    console.log(csvPreview);
    addPartToFirstColumn({
      id: crypto.randomUUID(),
      title: "Nueva Pieza",
      description: "Sin Descripción",
    });
    csvClose();
  };

  return (
    <>
      <div
        className="flex gap-4 h-full"
        onDragOver={handleDragOverFile}
        onDragLeave={handleDragLeaveFile}
        onDrop={handleDropFile}
      >
        {cols.length > 0
          ? cols.map((column: Column, index) => (
              <KanbanCol
                key={index}
                column={column}
                toggleMenu={toggleColumnMenu}
                onMovePart={handleMovePart}
              />
            ))
          : "empty"}
      </div>

      {/* Overlay visual cuando se arrastra un archivo */}
      {isDraggingFile && (
        <div className="fixed inset-0 z-11 flex items-center justify-center bg-black/40 pointer-events-none">
          <div className="bg-base p-6 rounded-xl pointer-events-none">
            <div className="flex items-center gap-2">
              <FaIcon name="file-arrow-down" size="size-10" light />
              <div>
                <div className="font-semibold">Suelta para cargar CSV</div>
                <div className="text-sm text-font-light">
                  Se mostrará un preview en un popup
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMenu && (
        <article
          ref={menuRef}
          className="fixed group z-10 bg-mantle border border-btn-border rounded-2xl shadow-2xl w-64 overflow-hidden menu-dropdown hover:border-font-light"
          style={{
            top: `${activeMenu.top}px`,
            left: `${activeMenu.left}px`,
          }}
        >
          <button className="w-full p-2 pl-8 hover:bg-base transition-colors flex items-center justify-between">
            <span className="font-light">Editar Nombre</span>
          </button>
          <button className="w-full p-2 pl-8 hover:bg-base transition-colors flex items-center justify-between">
            <span className="font-light">Mover a</span>
            <FaIcon name="chevron-right" size="size-4" light />
          </button>
          <button
            onClick={() => toggleColumnVisibility(activeMenu.columnId)}
            className={`w-full p-2 hover:bg-base transition-colors flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <FaIcon
                name="check"
                size="size-4"
                transparent={showColumnVisible[activeMenu.columnId]}
              />
              <span className="font-light">Mostrar Columna</span>
            </div>
            <span className="text-sm text-font-light">⌘↑H</span>
          </button>

          <hr className="border-t border-btn-border group-hover:border-font-light" />

          <button className="w-full p-2 pl-8 hover:bg-base transition-colors text-left flex items-center justify-between group">
            <span className="font-light">Borrar Contenido</span>
            <span className="text-sm text-font-light">⌘Supr</span>
          </button>

          <button
            className="w-full p-2 pl-8 hover:bg-base transition-colors text-left flex items-center justify-between group"
            disabled
          >
            <span className="font-medium text-font-light">Borrar Columna</span>
            <span className="text-xs text-font-light">⌘↑Supr</span>
          </button>
        </article>
      )}

      {/* CSV Preview Popup */}
      {csvPreview && (
        <div className="fixed inset-0 z-11 flex items-center justify-center bg-black/40">
          <article className="bg-mantle border border-btn-border rounded-2xl shadow-2xl w-full max-w-100 max-h-[80vh] overflow-auto p-3 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaIcon name="table" size="size-6" light />
                <div>
                  <div className="font-semibold">
                    Preview CSV {csvFileName ? `— ${csvFileName}` : ""}
                  </div>
                  {csvError && (
                    <div className="text-sm text-red-500">{csvError}</div>
                  )}
                </div>
              </div>
            </div>
            <table className="w-full table-fixed text-sm border border-btn-border rounded-xl">
              <tbody>
                {csvPreview.map((row, rowi) => (
                  <tr
                    key={rowi}
                    className={`border-b border-b-btn-border ${rowi % 2 ? "bg-base" : ""}`}
                  >
                    {row.map((cell, celli) => (
                      <td
                        key={celli}
                        className="p-2 overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex justify-between gap-2">
              <button
                onClick={csvClose}
                className="px-3 py-1 rounded-lg hover:bg-base text-red-300 border border-red-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={csvSaveContent}
                className="px-3 py-1 rounded-lg hover:bg-base text-main border border-main transition-colors"
              >
                Guardar
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default KanbanPage;

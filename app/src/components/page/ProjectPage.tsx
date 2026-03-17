import React, { useState } from "react";
import FaIcon from "../atom/FaIcon";
import type { Column } from "../../types/column";
import KanbanMode from "../template/ProjectKanbanMode";
import TableMode from "../template/ProjectTableMode";
import { useParams } from "react-router-dom";
import data from "../../demo/parts.json";
import parseCSV from "../../utils/parseCsv";
import type { Part } from "../../types/part";
import SecondaryButton from "../atom/buttons/Secondary";
import useLocalStorage from "../../hook/useLocalStorage";
//import FileOverlay from "../template/FileSaving";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams();
  const [isKanbanMode, setKanbanMode] = useLocalStorage("projectMode", true);
  const [columns, setColumns] = useState<Column[]>(data);

  // CSV drop / preview state
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [csvPreview, setCsvPreview] = useState<string[][] | null>(null);
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);

  // util: parser CSV simple (maneja comillas)

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
        setCsvError("Error al parsear CSV " + err);
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
  const addPartToFirstColumn = (newPart: Part) => {
    setColumns((prev) =>
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
    addPartToFirstColumn({
      id: crypto.randomUUID(),
      title: "Nueva Pieza",
      description: "Sin Descripción",
    });
    csvClose();
  };

  return (
    <>
      {/* Header */}
      <section className="flex items-center justify-between flex-wrap gap-2 pb-2">
        <div className="w-full md:w-fit rounded-xl px-4 py-2 flex items-center gap-4 border border-btn-border">
          <div className="w-full">
            <h1 className="text-xl font-bold pb-1">Proyecto: {projectId}</h1>
            <p className="text-sm text-font-light">Mano hidráulica automata</p>
          </div>
          <button className="p-2 hover:bg-base rounded-lg transition-colors">
            <FaIcon name="gear" light />
          </button>
        </div>

        <div className="w-full md:w-fit flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {["magnifying-glass", "filter", "sort"].map((icon, index) => (
              <button
                key={index}
                className="size-11 grid place-items-center bg-base rounded-lg transition-colors"
              >
                <FaIcon name={icon} light />
              </button>
            ))}
          </div>
          <div className="bg-base rounded-xl border border-btn-border p-1">
            <button
              className={`p-1 ${isKanbanMode ? "bg-main" : "hover:bg-base"} rounded-md aspect-square`}
              onClick={() => setKanbanMode(true)}
            >
              <FaIcon
                name="table-columns"
                size="size-8"
                invert={isKanbanMode}
              />
            </button>
            <button
              className={`p-1 ${!isKanbanMode ? "bg-main" : "hover:bg-base"} rounded-md aspect-square`}
              onClick={() => setKanbanMode(false)}
            >
              <FaIcon name="table-list" size="size-8" invert={!isKanbanMode} />
            </button>
          </div>
        </div>
      </section>

      {/* Kanban Board */}
      <section
        onDragOver={handleDragOverFile}
        onDragLeave={handleDragLeaveFile}
        onDrop={handleDropFile}
        className={`max-w-full overflow-x-scroll ${isKanbanMode ? "overflow-y-hidden custom-scroll-horizontal" : "overflow-y-scroll custom-scroll"}`}
      >
        {isKanbanMode ? (
          <KanbanMode columns={columns} />
        ) : (
          <TableMode columns={columns} />
        )}
      </section>

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

      {/* CSV Preview Popup */}
      {csvPreview && (
        <div className="fixed inset-0 z-11 flex items-center justify-center bg-black/40">
          <article className="relative bg-mantle border border-btn-border rounded-2xl shadow-2xl w-full max-w-100 max-h-[80vh] overflow-auto p-2 pb-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaIcon name="table" size="size-6" light />
                <div>
                  <div className="font-semibold">
                    Preview {csvFileName ? `— ${csvFileName}` : ""}
                  </div>
                  {csvError && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {csvError}
                    </div>
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
            <div className="sticky bg-mantle bottom-0 w-full flex justify-between gap-2 py-2">
              <SecondaryButton text="Cancelar" danger onClick={csvClose} />
              <SecondaryButton text="Guardar" safe onClick={csvSaveContent} />
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default ProjectPage;

import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import FaIcon from "../atom/FaIcon";
import type { Column } from "../../types/column";
const KanbanMode = lazy(() => import("../template/ProjectKanbanMode"));
const TableMode = lazy(() => import("../template/ProjectTableMode"));
import { useParams } from "react-router-dom";
import data from "../../demo/parts.json";
import parseCSV from "../../utils/parseCsv";
import type { Part } from "../../types/part";
import SecondaryButton from "../atom/buttons/Secondary";
import useLocalStorage from "../../hook/useLocalStorage";
import { ProjectColumnsProvider } from "../../context/ProjectContext";
import Loading from "../atom/Loading";
import ProjectFilterBtn, {
  type ProjectFilter,
} from "../molecule/ProjectFilter";
import Search from "../atom/Search";
import { searchCols } from "../../utils/searchCols";
import type { SortConfig, SortField } from "../../types/sort";
import { sortCols } from "../../utils/sortCols";
import SortControl from "../molecule/SortControl";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams();
  const [isKanbanMode, setKanbanMode] = useLocalStorage("projectMode", true);
  const [columns, setColumns] = useState<Column[]>(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const filteredCols = useMemo(
    () => sortCols(searchCols(columns, debouncedQuery), sortConfig),
    [columns, debouncedQuery, sortConfig],
  );

  // Para ordenar — si se vuelve a clickear el mismo campo, invierte el orden
  const handleSort = (field: SortField) => {
    setSortConfig((prev) =>
      prev?.field === field && prev.order === "asc"
        ? { field, order: "desc" }
        : { field, order: "asc" },
    );
  };
  const clearSort = () => setSortConfig(null);

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
            {(
              [
                {
                  icon: "magnifying-glass",
                  content: (
                    <Search
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      placeholder="Buscar piezas, procesos..."
                    />
                  ),
                },
                {
                  icon: "filter",
                  content: (
                    <SortControl
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      onClear={clearSort}
                    />
                  ),
                },
              ] as ProjectFilter[]
            ).map(({ icon, content }, index) => (
              <ProjectFilterBtn icon={icon} content={content} key={index} />
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
        className={`max-w-full overflow-x-scroll size-full ${isKanbanMode ? "overflow-y-hidden custom-scroll-horizontal" : "overflow-y-scroll custom-scroll"}`}
      >
        <ProjectColumnsProvider columns={filteredCols} setColumns={setColumns}>
          {isKanbanMode ? (
            <Suspense fallback={<Loading />}>
              <KanbanMode />
            </Suspense>
          ) : (
            <Suspense fallback={<Loading />}>
              <TableMode />
            </Suspense>
          )}
        </ProjectColumnsProvider>
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

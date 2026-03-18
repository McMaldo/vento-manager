import React from "react";
import FaIcon from "../atom/FaIcon";
import type { Part } from "../../types/part";
import ProcessCheck from "../atom/ProcessCheck";
import DetailsButton from "../atom/buttons/Details";
import { useProjectColumns } from "../../context/ProjectContext";

const td = "px-3 py-2 align-center";

const PartTableMode: React.FC<{
  part: Part;
  columnId: string;
  isExpanded: boolean;
}> = ({ part, columnId, isExpanded }) => {
  const {
    dragOver,
    dragPart,
    setDragPart,
    setDragCol,
    setDragOver,
    handleDrop,
    toggle,
    updatePart,
    delPart,
    toggleProc,
    updateProc,
    delProc,
    addProc,
    updateStore,
  } = useProjectColumns();

  const procs = part.process ?? [];
  const done = procs.filter((pr) => pr.isCompleted).length;
  const pct = procs.length ? Math.round((done / procs.length) * 100) : null;
  const loc = part.store?.location ?? {};
  const locStr = [
    loc.rack != null ? `R${loc.rack}` : "",
    loc.column != null ? `C${loc.column}` : "",
    loc.row != null ? `F${loc.row}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <tr
        draggable
        className={`group hover:bg-base ${dragOver === part.id ? "border-t-2 border-main" : ""} ${isExpanded ? "border-t border-x border-btn-border" : ""}`}
        style={{ opacity: dragPart === part.id ? 0.3 : 1 }}
        onDragStart={() => {
          setDragPart(part.id);
          setDragCol(columnId);
        }}
        onDragEnd={() => {
          setDragPart(null);
          setDragCol(null);
          setDragOver(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(part.id);
        }}
        onDragLeave={() => setDragOver(null)}
        onDrop={() => handleDrop(columnId, part.id)}
      >
        <td
          className={
            td +
            " cursor-grab flex justify-center opacity-10 transition-opacity group-hover:opacity-100"
          }
        >
          <FaIcon name="grip-lines" light />
        </td>
        <td className={td + " pl-7"}>
          <span
            className="mr-1 text-btn-border text-xs inline-block cursor-pointer transition-transform"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            onClick={() => toggle("part_" + part.id)}
          >
            ▶
          </span>
          <input
            className="bg-transparent border-none outline-none text-sm w-36"
            value={part.title}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) =>
              updatePart(columnId, part.id, "title", e.target.value)
            }
          />
        </td>
        <td className={td}>
          <input
            className="bg-transparent border-none outline-none text-xs text-icon w-full"
            value={part.description}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) =>
              updatePart(columnId, part.id, "description", e.target.value)
            }
          />
        </td>
        <td className={td + " text-xs text-icon"}>
          {pct !== null ? `${done}/${procs.length} (${pct}%)` : "—"}
        </td>
        <td className={td + " text-xs text-icon"}>{locStr || "—"}</td>
        <td className={td}>
          <button
            className="text-xs text-btn-border group-hover:text-icon hover:text-red-500 dark:hover:text-red-400 bg-transparent border-none cursor-pointer"
            onClick={() => delPart(columnId, part.id)}
          >
            ✕ Eliminar
          </button>
        </td>
      </tr>

      {isExpanded && (
        <>
          {procs.map((proc, i) => (
            <tr
              key={`proc-${part.id}-${i}`}
              className="hover:bg-base border-x border-btn-border"
            >
              <td className={td} />
              <td className={td + " pl-14"}>
                <ProcessCheck
                  key={i}
                  partID={part.id}
                  item={proc}
                  onToggle={() => toggleProc(columnId, part.id, i)}
                  onChange={(e) =>
                    updateProc(columnId, part.id, i, "name", e.target.value)
                  }
                />
              </td>
              <td className={td + " text-xs text-icon"} colSpan={3}>
                {proc.isCompleted ? "Completado" : "Pendiente"}
              </td>
              <td className={td}>
                <button
                  className="text-xs text-btn-border group-hover:text-icon hover:text-red-500 dark:hover:text-red-400 bg-transparent border-none cursor-pointer"
                  onClick={() => delProc(columnId, part.id, i)}
                >
                  ✕ Eliminar
                </button>
              </td>
            </tr>
          ))}

          <tr key={`addproc-${part.id}`} className="border-x border-btn-border">
            <td className={td} />
            <td className={td + " pl-14"} colSpan={5}>
              <button
                className="text-xs text-icon hover:text-font bg-transparent border-none cursor-pointer"
                onClick={() => addProc(columnId, part.id)}
              >
                + Agregar Proceso
              </button>
            </td>
          </tr>

          <tr
            key={`store-${part.id}`}
            className="bg-base border-b border-x border-btn-border"
          >
            <td className={td} />
            <td className={td + " pl-14"}>
              <DetailsButton href={"part/" + part.id} bg="" />
            </td>
            <td className={td + " space-x-4"} colSpan={4}>
              <span className="text-xs text-icon">
                {part.store?.id != null
                  ? `Almacén #${part.store.id}`
                  : "Sin Almacenar"}
              </span>
              {(
                [
                  ["rack", "Estante"],
                  ["column", "Col"],
                  ["row", "Fila"],
                ] as const
              ).map(([field, label]) => (
                <span key={field} className="text-xs">
                  <span className="text-icon mr-1">{label}</span>
                  <input
                    type="number"
                    className="w-12 text-xs border border-btn-border hover:border-font focus:border-font rounded px-1 py-0.5 outline-none"
                    value={part.store?.location?.[field] ?? ""}
                    onMouseDown={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      updateStore(columnId, part.id, field, e.target.value)
                    }
                  />
                </span>
              ))}
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default PartTableMode;

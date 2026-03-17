import type { FC, Dispatch, SetStateAction } from "react";
import type { Part } from "../../types/part";
import FaIcon from "../atom/FaIcon";

const PartTableMode: FC<{
  part: Part;
  partOpen: boolean;
  dragPart: string | null;
  setDragPart: Dispatch<SetStateAction<string | null>>;
  setDragCol: Dispatch<SetStateAction<string | null>>;
  dragOver: string | null;
  setDragOver: Dispatch<SetStateAction<string | null>>;
}> = ({ part, partOpen, setDragPart, setDragCol, dragOver, setDragOver }) => {
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

  return [
    <tr
      key={part.id}
      draggable
      className={
        "hover:bg-blue-50 " +
        (dragOver === part.id ? "border-t-2 border-btn-border" : "")
      }
      style={{ opacity: dragPart === part.id ? 0.3 : 1 }}
      onDragStart={() => {
        setDragPart(part.id);
        setDragCol(col.id);
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
      onDrop={() => handleDrop(col.id, part.id)}
    >
      <td className={td + " cursor-grab text-xs pl-7"}>
        <FaIcon name="grip-lines" />
      </td>
      <td className={td + " pl-7"}>
        <span
          className="mr-1 text-gray-400 text-xs inline-block cursor-pointer transition-transform"
          style={{
            transform: partOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
          onClick={() => toggle("part_" + part.id)}
        >
          ▶
        </span>
        <input
          className="bg-transparent border-none outline-none text-sm w-36"
          value={part.title}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => updatePart(col.id, part.id, "title", e.target.value)}
        />
      </td>
      <td className={td}>
        <input
          className="bg-transparent border-none outline-none text-xs text-gray-500 w-full"
          value={part.description}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) =>
            updatePart(col.id, part.id, "description", e.target.value)
          }
        />
      </td>
      <td className={td + " text-xs text-gray-500"}>
        {pct !== null ? `${done}/${procs.length} (${pct}%)` : "—"}
      </td>
      <td className={td + " text-xs text-gray-400"}>{locStr || "—"}</td>
      <td className={td}>
        <button
          className="text-xs text-gray-300 hover:text-red-400 bg-transparent border-none cursor-pointer"
          onClick={() => delPart(col.id, part.id)}
        >
          ✕
        </button>
      </td>
    </tr>,

    // ── Expanded: processes + store ──
    partOpen && [
      ...procs.map((proc, i) => (
        <tr key={`proc-${part.id}-${i}`} className="hover:bg-gray-50">
          <td className={td} />
          <td className={td + " pl-14"}>
            <span
              className={
                "inline-flex items-center justify-center w-3.5 h-3.5 rounded border mr-1.5 cursor-pointer align-middle shrink-0 " +
                (proc.isCompleted
                  ? "bg-green-100 border-green-400"
                  : "bg-white border-gray-300")
              }
              onClick={() => toggleProc(col.id, part.id, i)}
            >
              {proc.isCompleted && <FaIcon name="check" />}
            </span>
            <input
              className="bg-transparent border-none outline-none text-xs w-32"
              value={proc.name}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) =>
                updateProc(col.id, part.id, i, "name", e.target.value)
              }
            />
          </td>
          <td className={td + " text-xs text-gray-400"} colSpan={3}>
            {proc.isCompleted ? "Completado" : "Pendiente"}
          </td>
          <td className={td}>
            <button
              className="text-xs text-gray-300 hover:text-red-400 bg-transparent border-none cursor-pointer"
              onClick={() => delProc(col.id, part.id, i)}
            >
              ✕
            </button>
          </td>
        </tr>
      )),

      <tr key={`addproc-${part.id}`}>
        <td className={td} />
        <td className={td + " pl-14"} colSpan={5}>
          <button
            className="text-xs text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
            onClick={() => addProc(col.id, part.id)}
          >
            + proceso
          </button>
        </td>
      </tr>,

      <tr key={`store-${part.id}`} className="bg-gray-50">
        <td className={td} />
        <td className={td + " pl-14 text-xs text-gray-400"}>
          Almacén {part.store?.id != null ? `#${part.store.id}` : ""}
        </td>
        <td className={td} colSpan={4}>
          {[
            ["rack", "Estante"],
            ["column", "Col"],
            ["row", "Fila"],
          ].map(([field, label]) => (
            <span key={field} className="mr-4 text-xs">
              <span className="text-gray-400 mr-1">{label}</span>
              <input
                type="number"
                className="w-12 text-xs border border-gray-200 rounded px-1 py-0.5 outline-none"
                value={part.store?.location?.[field] ?? ""}
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) =>
                  updateStore(col.id, part.id, field, e.target.value)
                }
              />
            </span>
          ))}
        </td>
      </tr>,
    ],
  ];
};
export default PartTableMode;

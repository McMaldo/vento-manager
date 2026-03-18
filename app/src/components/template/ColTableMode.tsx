import React from "react";
import type { Column } from "../../types/column";
import PartTableMode from "./PartTableMode";
import SecondaryButton from "../atom/buttons/Secondary";
import { useProjectColumns } from "../../context/ProjectContext";

const td = "px-3 py-1.5 align-center";

const ColTableRow: React.FC<{
  col: Column;
}> = ({ col }) => {
  const { expanded, toggle, updateCol, addPart } = useProjectColumns();

  const colOpen = !!expanded["col_" + col.id];
  const doneCount = col.parts.filter(
    (p) =>
      (p.process ?? []).length > 0 &&
      (p.process ?? []).every((pr) => pr.isCompleted),
  ).length;

  return (
    <>
      <tr
        className="sticky top-8 z-2 bg-base cursor-pointer hover:bg-base"
        onClick={(e) => {
          const tagName = e.target.tagName.toUpperCase();
          if (tagName === "INPUT" || tagName === "BUTTON") return;
          toggle("col_" + col.id);
        }}
      >
        <td className={td} />
        <td className={td + " font-medium"} colSpan={3}>
          <span
            className="mr-1 text-font-light text-xs inline-block transition-transform"
            style={{ transform: colOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
          <span
            className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle"
            style={{ background: col.color }}
          />
          <input
            className="bg-transparent border-none outline-none font-medium text-sm w-36"
            value={col.title}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => updateCol(col.id, "title", e.target.value)}
          />
          <span className="text-xs text-icon ml-2">
            {col.parts.length} piezas
          </span>
        </td>
        <td className={td + " text-xs text-icon"}>
          {doneCount}/{col.parts.length} completas
        </td>
        <td className={td}>
          <SecondaryButton
            icon="plus"
            text="Pieza"
            onClick={(e) => {
              e.stopPropagation();
              addPart(col.id);
            }}
            sm
          />
        </td>
      </tr>

      {colOpen &&
        col.parts.map((part) => (
          <PartTableMode
            key={part.id}
            part={part}
            columnId={col.id}
            isExpanded={!!expanded["part_" + part.id]}
          />
        ))}
    </>
  );
};

export default ColTableRow;

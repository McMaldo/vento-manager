import React from "react";
import type { Column } from "../../types/column";
import PartTableMode from "./PartTableMode";
import SecondaryButton from "../atom/buttons/Secondary";

interface ColTableRowProps {
  col: Column;
  expanded: Record<string, boolean>;
  dragPart: string | null;
  dragOver: string | null;
  toggle: (key: string) => void;
  updateCol: (colId: string, field: string, value: string) => void;
  addPart: (colId: string) => void;
  delPart: (colId: string, partId: string) => void;
  updatePart: (
    colId: string,
    partId: string,
    field: string,
    value: string,
  ) => void;
  toggleProc: (colId: string, partId: string, idx: number) => void;
  updateProc: (
    colId: string,
    partId: string,
    idx: number,
    field: string,
    value: string,
  ) => void;
  addProc: (colId: string, partId: string) => void;
  delProc: (colId: string, partId: string, idx: number) => void;
  updateStore: (
    colId: string,
    partId: string,
    field: string,
    rawValue: string,
  ) => void;
  setDragPart: (id: string | null) => void;
  setDragCol: (id: string | null) => void;
  setDragOver: (id: string | null) => void;
  handleDrop: (tgtColId: string, tgtPartId: string) => void;
}

const td = "px-3 py-1.5 align-center";

const ColTableRow: React.FC<ColTableRowProps> = ({
  col,
  expanded,
  dragPart,
  dragOver,
  toggle,
  updateCol,
  addPart,
  delPart,
  updatePart,
  toggleProc,
  updateProc,
  addProc,
  delProc,
  updateStore,
  setDragPart,
  setDragCol,
  setDragOver,
  handleDrop,
}) => {
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
            col={col}
            isExpanded={!!expanded["part_" + part.id]}
            dragPart={dragPart}
            dragOver={dragOver}
            toggle={toggle}
            delPart={delPart}
            updatePart={updatePart}
            toggleProc={toggleProc}
            updateProc={updateProc}
            addProc={addProc}
            delProc={delProc}
            updateStore={updateStore}
            setDragPart={setDragPart}
            setDragCol={setDragCol}
            setDragOver={setDragOver}
            handleDrop={handleDrop}
          />
        ))}
    </>
  );
};

export default ColTableRow;

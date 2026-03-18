import type React from "react";
import type { Column } from "../../types/column";
import FaIcon from "../atom/FaIcon";
import PartKanbanMode from "./PartKanbanMode";
import { useEffect, useRef, useState } from "react";
import { useProjectColumns } from "../../context/ProjectContext";

const ColKanbanMode: React.FC<{
  column: Column;
  toggleMenu: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void;
}> = ({ column, toggleMenu }) => {
  const { addPart, updateCol } = useProjectColumns();
  const [isHovered, setHovered] = useState<boolean>(false);
  const [addPartBtnHeight, setAddPartBtnHeight] = useState<number>(0);
  const addPartBtn = useRef<HTMLButtonElement>(null);
  const [isEditable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (addPartBtn.current) {
      setAddPartBtnHeight(addPartBtn.current.scrollHeight);
    }
  }, []);

  return (
    <div
      key={column.id}
      className="grid grid-rows-[auto_1fr] rounded-2xl w-90 shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Column Header */}
      <div className="flex flex-col px-3 py-1">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className={`size-6 rounded-full p-1 ${column.color}`}>
              <div className="size-4 rounded-full bg-base"></div>
            </div>
            <input
              value={column.title}
              readOnly={!isEditable}
              className="bg-transparent border-none outline-none text-xl font-bold w-full"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => updateCol(column.id, "title", e.target.value)}
            />
            <span className="text-sm text-font-light font-semibold bg-base py-1 px-2 rounded-md">
              {column.parts.length}
            </span>
          </div>
          <button
            onClick={(e) => toggleMenu(column.id, e)}
            className="p-1 hover:bg-base rounded-lg transition-colors relative"
          >
            <FaIcon name="ellipsis-vertical" size="size-8" light />
          </button>
        </div>
        <div
          className="w-full overflow-hidden transition-all pt-2"
          style={{
            height: isHovered ? addPartBtnHeight + 8 : 0,
          }}
        >
          <button
            ref={addPartBtn}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-icon hover:bg-font transition-colors"
            onClick={() => addPart(column.id)}
          >
            <FaIcon name="plus" invert size="size-4" />
            <span className="text-base">Agregar Pieza</span>
          </button>
        </div>
      </div>

      {/* Scrollable Tasks */}
      <div className="max-h-full overflow-y-scroll custom-scroll space-y-4 p-2">
        {column.parts.map((part) => (
          // ahora pasamos columnId para que PartKanbanMode haga drag con origen
          <PartKanbanMode key={part.id} part={part} columnId={column.id} />
        ))}
      </div>
    </div>
  );
};
export default ColKanbanMode;

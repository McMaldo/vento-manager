import type React from "react";
import type { Column } from "../../types/column";
import FaIcon from "../atom/FaIcon";
import KanbanPart from "../molecule/KanbanPart";
import { useEffect, useRef, useState } from "react";
import type { Part } from "../../types/part";

interface KanbanColProps {
  column: Column;
  toggleMenu: (
    id: string,
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void;
  // nuevo callback que el padre debe implementar para mover piezas entre columnas
  onMovePart: (partId: string, fromColumnId: string, toColumnId: string) => void;
}
const KanbanCol: React.FC<KanbanColProps> = ({ column, toggleMenu, onMovePart }) => {
  const [partList, setPartList] = useState<Part[]>(column.parts);

  const [isHovered, setHovered] = useState<boolean>(false);
  const [addPartBtnHeight, setAddPartBtnHeight] = useState<number>(0);
  const addPartBtn = useRef<HTMLButtonElement>(null);

  const newPart: Part = {
    id: crypto.randomUUID(),
    img: "",
    title: "Nueva Pieza",
    description: "Sin Descripción",
  };

  useEffect(() => {
    if (addPartBtn.current) {
      setAddPartBtnHeight(addPartBtn.current.scrollHeight);
    }
  }, []);

  // sincroniza estado local cuando el padre actualiza column.parts
  useEffect(() => {
    setPartList(column.parts);
  }, [column.parts]);

  // DnD handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necesario para permitir drop
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json") || e.dataTransfer.getData("text/plain");
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      const { partId, fromColumnId } = parsed;
      if (!partId || !fromColumnId) return;
      if (fromColumnId === column.id) return; // mismo column => no mover
      onMovePart(partId, fromColumnId, column.id);
    } catch {
      // ignore malformed data
    }
  };

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
            <h2 className="text-xl font-bold">{column.title}</h2>
            <span className="text-sm text-font-light font-semibold bg-base py-1 px-2 rounded-md">
              {partList.length}
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
            onClick={() => setPartList([newPart, ...partList])}
          >
            <FaIcon name="plus" invert size="size-4" />
            <span className="text-base">Agregar Pieza</span>
          </button>
        </div>
      </div>

      {/* Scrollable Tasks */}
      <div
        className="max-h-full overflow-y-scroll custom-scroll space-y-4 p-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {partList.map((part) => (
          // ahora pasamos columnId para que KanbanPart haga drag con origen
          <KanbanPart key={part.id} part={part} columnId={column.id} />
        ))}
      </div>
    </div>
  );
};
export default KanbanCol;

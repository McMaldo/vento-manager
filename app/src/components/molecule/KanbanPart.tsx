import type React from "react";
import type { Part } from "../../types/part";
import { useState, useRef, useEffect } from "react";
import ProcessCheck from "../atom/ProcessCheck";
import FaIcon from "../atom/FaIcon";
import DetailsButton from "../atom/buttons/Details";

interface KanbanPartProps {
  part: Part;
  columnId: string;
}

const KanbanPart: React.FC<KanbanPartProps> = ({ part, columnId }) => {
  const [partProps, setPartProps] = useState<Part>(part);
  const [isDraging, setDraging] = useState<boolean>(false);
  const [isHovered, setHovered] = useState<boolean>(false);
  const [addProcessBtnHeight, setAddProcessBtnHeight] = useState<number>(0);
  const addProcessBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (addProcessBtn.current) {
      setAddProcessBtnHeight(addProcessBtn.current.scrollHeight);
    }
  }, []);

  // drag start
  const handleDragStart = (e: React.DragEvent) => {
    setDraging(true);
    const payload = JSON.stringify({ partId: part.id, fromColumnId: columnId });
    // preferencia por application/json; fallback a text/plain
    e.dataTransfer.setData("application/json", payload);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setDraging(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        "part-card group relative rounded-xl border border-btn-border hover:border-font-light p-3 cursor-grab transition-colors " +
        (isDraging ? "opacity-40 border-main" : "opacity-100")
      }
    >
      {part.img && (
        <img
          src={part.img}
          alt={part.title}
          className="w-full h-32 rounded-lg mb-2"
        />
      )}

      <input
        type="text"
        name="name"
        value={partProps.title}
        tabIndex={1}
        onChange={(e) =>
          setPartProps((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder={part.title}
        className="w-full bg-mantle outline-none border-none font-bold text-2xl"
      />
      <input
        type="text"
        name="name"
        value={partProps.description}
        tabIndex={1}
        onChange={(e) =>
          setPartProps((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder={part.description}
        className="w-full bg-mantle outline-none border-none text-font-light text-sm"
      />
      <div className="flex flex-col">
        {partProps.process &&
          partProps.process.map((item, index) => (
            <ProcessCheck key={index} partID={partProps.id} item={item} />
          ))}
        <button
          ref={addProcessBtn}
          style={{
            height: isHovered ? addProcessBtnHeight + 8 : 0,
          }}
          className="flex items-center gap-2 text-font-light hover:text-font text-nowrap overflow-hidden transition-all opacity-0 group-hover:opacity-100 text-md group-hover:py-1"
          onClick={() =>
            setPartProps((prev) => ({
              ...prev,
              process: [
                ...(prev.process ?? []),
                { isCompleted: false, name: "Nuevo Proceso" },
              ],
            }))
          }
        >
          <FaIcon name="plus" size="size-3" />
          <span>Agregar Proceso</span>
        </button>
        {partProps.store && (
          <div className="flex gap-2">
            <span className="w-fit px-2 border border-btn-border rounded-xl text-sm text-icon">
              Almacen {partProps.store.id}
            </span>
            <span className="w-fit px-2 border border-btn-border rounded-xl text-sm text-icon">
              {partProps.store.location.rack && (
                <>Estante {partProps.store.location.rack}</>
              )}
              {partProps.store.location.rack &&
              partProps.store.location.column ? (
                <> - </>
              ) : (
                ""
              )}
              {partProps.store.location.column && (
                <>Columna {partProps.store.location.column}</>
              )}
              {partProps.store.location.column &&
              partProps.store.location.row ? (
                <> - </>
              ) : (
                ""
              )}
              {partProps.store.location.row && (
                <>Fila {partProps.store.location.row}</>
              )}
            </span>
          </div>
        )}
      </div>
      <div className="absolute right-2 bottom-2 hidden transition-opacity opacity-0 group-hover:opacity-100 group-hover:block">
        <DetailsButton href={"part/" + partProps.id} />
      </div>
    </div>
  );
};
export default KanbanPart;

import type React from "react";
import type { Part } from "../../types/part";
import { useState, useRef, useEffect } from "react";
import ProcessCheck from "../atom/ProcessCheck";
import DetailsButton from "../atom/buttons/Details";
import { useProjectColumns } from "../../context/ProjectContext";

const PartKanbanMode: React.FC<{
  part: Part;
  columnId: string;
}> = ({ part, columnId }) => {
  const {
    toggleProc,
    updateProc,
    updatePart,
    addProc,
    dragPart,
    setDragPart,
    setDragCol,
    dragOver,
    setDragOver,
    handleDrop,
  } = useProjectColumns();

  const [isHovered, setHovered] = useState<boolean>(false);
  const [addProcessBtnHeight, setAddProcessBtnHeight] = useState<number>(0);
  const addProcessBtn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addProcessBtn.current) {
      setAddProcessBtnHeight(addProcessBtn.current.scrollHeight);
    }
  }, []);

  return (
    <div
      draggable
      className={`part-card group relative rounded-xl border border-btn-border hover:border-font-light p-3 cursor-grab transition-colors ${dragOver === part.id ? "outline-t-2 outline-main" : ""} ${dragPart === part.id ? "opacity-40 border-main" : "opacity-100"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
      {part.img && (
        <img
          src={part.img}
          alt={part.title}
          className="w-full h-32 rounded-lg mb-2"
        />
      )}

      <input
        type="text"
        name="title"
        value={part.title}
        tabIndex={1}
        onChange={(e) => updatePart(columnId, part.id, "title", e.target.value)}
        placeholder={part.title}
        className="w-full bg-mantle outline-none border-none font-bold text-2xl"
      />
      <input
        type="text"
        name="name"
        value={part.description}
        tabIndex={1}
        onChange={(e) =>
          updatePart(columnId, part.id, "description", e.target.value)
        }
        placeholder={part.description}
        className="w-full bg-mantle outline-none border-none text-font-light text-sm"
      />
      {part.store && (
        <div className="flex gap-2 py-1">
          <span className="w-fit px-2 border border-btn-border rounded-xl text-sm text-icon">
            Almacen {part.store.id}
          </span>
          <span className="w-fit px-2 border border-btn-border rounded-xl text-sm text-icon">
            {part.store.location.rack && (
              <>Estante {part.store.location.rack}</>
            )}
            {part.store.location.rack && part.store.location.column ? (
              <> - </>
            ) : (
              ""
            )}
            {part.store.location.column && (
              <>Columna {part.store.location.column}</>
            )}
            {part.store.location.column && part.store.location.row ? (
              <> - </>
            ) : (
              ""
            )}
            {part.store.location.row && <>Fila {part.store.location.row}</>}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        {part.process &&
          part.process.map((item, index) => (
            <ProcessCheck
              key={index}
              partID={part.id}
              item={item}
              onToggle={() => toggleProc(columnId, part.id, index)}
              onChange={(e) =>
                updateProc(columnId, part.id, index, "name", e.target.value)
              }
            />
          ))}
        <div
          ref={addProcessBtn}
          style={{
            height: isHovered ? addProcessBtnHeight + 8 : 0,
          }}
          className="flex justify-between transition-all"
        >
          <button
            className="flex items-center gap-2 w-fit text-font-light hover:text-font text-nowrap overflow-hidden transition-all opacity-0 group-hover:opacity-100 text-sm group-hover:py-1"
            onClick={() => addProc(columnId, part.id)}
          >
            + Agregar Proceso
          </button>
          <DetailsButton
            href={"part/" + part.id}
            sm
            className="opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};
export default PartKanbanMode;

import type React from "react";
import type { Part } from "../../types/part";
import { useState } from "react";

interface KanbanPartProps {
  part: Part;
}
const KanbanPart: React.FC<KanbanPartProps> = ({ part }) => {
  const [partProps, setPartProps] = useState<Part>(part);

  return (
    <article className="part-card rounded-xl border border-btn-border hover:border-font-light p-3">
      {part.img ? (
        <img
          src={part.img}
          alt={part.title}
          className="w-full h-32 rounded-lg mb-2"
        />
      ) : (
        <div className="w-full h-32 bg-base rounded-lg mb-2"></div>
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
    </article>
  );
};
export default KanbanPart;

import type { Process } from "../../types/part";
import { useState } from "react";
import FaIcon from "../atom/FaIcon";
import processes from "../../assets/processes.json";

interface ProcessCheckProps {
  partID: string;
  item: Process;
}

const ProcessCheck: React.FC<ProcessCheckProps> = ({ partID, item }) => {
  const [itemProps, setItemProps] = useState<Process>(item);
  const inputID = `${partID}-${itemProps.name}`;
  const datalistID = `${inputID}-suggestions`;

  const toggleCheck = () =>
    setItemProps((prev) => ({ ...prev, isCompleted: !prev.isCompleted }));

  return (
    <div id={inputID} className="flex items-center gap-2" onClick={toggleCheck}>
      <div
        className={`grid place-items-center size-4 border border-icon hover:border-font transition-colors ${
          itemProps.isCompleted ? "bg-icon hover:bg-font" : "bg-base"
        }`}
      >
        <FaIcon name="check" size="size-3" invert />
      </div>

      <input
        type="text"
        name="name"
        list={datalistID}
        value={itemProps.name}
        onChange={(e) =>
          setItemProps((prev) => ({ ...prev, name: e.target.value }))
        }
        onClick={(e) => e.stopPropagation()}
        placeholder={item.name}
        className="w-full bg-none outline-none border-none text-icon"
      />

      <datalist id={datalistID}>
        {processes.map((process) => (
          <option key={process} value={process} />
        ))}
      </datalist>
    </div>
  );
};

export default ProcessCheck;

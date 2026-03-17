import type { Process } from "../../types/part";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import FaIcon from "../atom/FaIcon";
import processes from "../../assets/processes.json";

const ProcessCheck: React.FC<{
  partID: string;
  item: Process;
  onToggle: MouseEventHandler<HTMLDivElement> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
}> = ({ partID, item, onToggle, onChange, className = "" }) => {
  const inputID = `${partID}-${item.name}`;
  const datalistID = `${inputID}-suggestions`;
  const placeholder = item.name;

  return (
    <div
      id={inputID}
      className={"group flex items-center gap-2 " + className}
      onClick={onToggle}
    >
      <div
        className={`grid place-items-center size-4 border border-btn-border transition-colors ${
          item.isCompleted ? "bg-icon hover:bg-font" : "group-hover:border-icon"
        }`}
      >
        <FaIcon name="check" size="size-3" invert />
      </div>

      <input
        type="text"
        name="name"
        list={datalistID}
        value={item.name}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        placeholder={placeholder}
        className={
          "w-full bg-none outline-none border-none text-sm " +
          (item.isCompleted ? "line-through  text-font-light" : "text-icon")
        }
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

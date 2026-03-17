import type React from "react";
import { Link } from "react-router-dom";
import FaIcon from "../FaIcon";
import { useState } from "react";

const SecondaryButton: React.FC<{
  icon?: string;
  href?: string;
  text: string;
  danger?: boolean;
  safe?: boolean;
  onClick?: (arg?: any) => void;
  sm?: boolean;
  lg?: boolean;
}> = ({
  icon,
  href,
  text,
  danger = false,
  safe = false,
  onClick,
  sm = false,
  lg = false,
}) => {
  const [isHovered, setHovered] = useState(false);
  const color = danger
    ? "border-red-400 text-red-400 hover:border-red-500 hover:text-font hover:bg-red-100 dark:hover:bg-red-900"
    : safe
      ? "border-blue-500 text-blue-500 hover:border-blue-600 hover:text-font hover:bg-blue-100 dark:hover:bg-blue-900"
      : "border-icon text-icon hover:border-font hover:text-font";
  const size = sm
    ? "text-sm py-1 px-2"
    : lg
      ? "text-lg py-3 px-6"
      : "text-md py-2 px-4";
  const className = `cursor-pointer flex items-center gap-2 border-2 rounded-lg transition-colors font-medium select-none ${color} ${size}`;
  const content = (
    <>
      {icon && (
        <FaIcon name={icon} size="size-4" red={danger} accent={isHovered} />
      )}
      <span>{text}</span>
    </>
  );
  return href ? (
    <Link
      to={href}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </Link>
  ) : onClick ? (
    <button
      onClick={onClick}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </button>
  ) : (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </div>
  );
};
export default SecondaryButton;

import type React from "react";
import { Link } from "react-router-dom";

const MainButton: React.FC<{
  href?: string;
  text: string;
  sm?: boolean;
  lg?: boolean;
}> = ({ href, text, sm = false, lg = false }) => {
  const size = sm
    ? "text-sm py-1 px-2"
    : lg
      ? "text-lg py-3 px-6"
      : "text-md py-2 px-4";
  const className = `cursor-pointer flex items-center bg-icon text-mantle rounded-lg hover:bg-font transition-colors font-medium ${size}`;
  return href ? (
    <Link to={href} className={className}>
      {text}
    </Link>
  ) : (
    <div className={className}>{text}</div>
  );
};
export default MainButton;

import type React from "react";
import { Link } from "react-router-dom";

interface MainButtonProps {
  href: string;
  text: string;
}
const MainButton: React.FC<MainButtonProps> = ({ href, text }) => {
  return (
    <Link
      to={href}
      className="flex gap-2 items-center text-sm font-semibold text-icon hover:text-font transition-colors hover:bg-base px-3 py-2 rounded-md"
    >
      {text}
    </Link>
  );
};
export default MainButton;

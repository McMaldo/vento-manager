import type React from "react";
import { Link } from "react-router-dom";
import FaIcon from "../FaIcon";

interface DetailsButtonProps {
  label?: string;
  href?: string;
  className?: string;
  bg?: string;
  sm?: boolean;
}
const DetailsButton: React.FC<DetailsButtonProps> = ({
  label = "Ver Detalles",
  href,
  className = "",
  bg = "bg-mantle hover:bg-base",
  sm = false,
}) => {
  className += ` w-fit flex gap-2 items-center text-sm font-semibold text-icon hover:text-font transition-all ${sm ? "" : "px-3 py-2 " + bg} rounded-md`;

  return href ? (
    <Link to={href} className={className}>
      <span>{label}</span>
      <FaIcon name="arrow-right" size="size-4" />
    </Link>
  ) : (
    <div className={className}>
      <span>{label}</span>
      <FaIcon name="arrow-right" size="size-4" />
    </div>
  );
};
export default DetailsButton;

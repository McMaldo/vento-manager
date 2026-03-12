import type React from "react";
import { Link } from "react-router-dom";
import FaIcon from "../FaIcon";

interface DetailsButtonProps {
  label?: string;
  href?: string;
}
const DetailsButton: React.FC<DetailsButtonProps> = ({
  label = "Ver Detalles",
  href,
}) => {
  const className =
    "w-fit flex gap-2 items-center text-sm font-semibold text-icon hover:text-font transition-colors bg-mantle hover:bg-base px-3 py-2 rounded-md";

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

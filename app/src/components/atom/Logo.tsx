import type React from "react";

interface LogoProps {
  className?: string;
  color?: string;
}
const Logo: React.FC<LogoProps> = ({ className = "", color = "base" }) => {
  const colorVar: string = `var(--color-${color}) `;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_2_1272)">
        <rect y="29.0908" width="25.4545" height="10.9091" fill={colorVar} />
        <rect x="14.5459" width="10.9091" height="25.4545" fill={colorVar} />
        <rect
          x="29.0908"
          y="14.5454"
          width="10.9091"
          height="25.4545"
          fill={colorVar}
        />
        <rect width="10.9091" height="10.9091" fill={colorVar} />
      </g>
    </svg>
  );
};
export default Logo;

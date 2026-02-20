interface FaIconProps {
  name?: string;
  size?: string;
  light?: boolean;
  invert?: boolean;
  transparent?: boolean;
}

const FaIcon: React.FC<FaIconProps> = ({
  name = "envelope",
  size = "size-6",
  light = false,
  invert = false,
  transparent = false,
}) => {
  const iconName = name.toLowerCase();

  return (
    <svg
      className={`${light ? "fa-icon-light" : invert ? "fa-icon-invert" : "fa-icon"} ${transparent ? "opacity-0" : "opacity-100"} ${size} inline-block select-none`}
      aria-hidden="true"
    >
      <use xlinkHref={`/icon/faIcons.svg#${iconName}`} />
    </svg>
  );
};
export default FaIcon;

const FaIcon: React.FC<{
  name?: string;
  size?: string;
  light?: boolean;
  invert?: boolean;
  transparent?: boolean;
  accent?: boolean;
  red?: boolean;
}> = ({
  name = "envelope",
  size = "size-6",
  light = false,
  invert = false,
  transparent = false,
  accent = false,
  red = false,
}) => {
  const iconName = name.toLowerCase();

  return (
    <svg
      className={`${light ? "fa-icon-light" : invert ? "fa-icon-invert" : accent ? "fa-icon-accent" : red ? "fa-icon-red" : "fa-icon"} ${transparent ? "opacity-0" : "opacity-100"} ${size} inline-block select-none transition-colors`}
      aria-hidden="true"
    >
      <use xlinkHref={`/icon/faIcons.svg#${iconName}`} />
    </svg>
  );
};
export default FaIcon;

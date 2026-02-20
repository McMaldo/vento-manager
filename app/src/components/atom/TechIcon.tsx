interface TechIconProps {
  name: string;
  size?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ name, size = "size-11" }) => {
  name = name.replace(" ", "");

  return (
    <svg
      className={`tech-icon ${name} inline-block ${size} rounded-lg transition-colors select-none bg-btn group-hover:bg-btn-hover`}
      aria-hidden="true"
    >
      <use xlinkHref={`/icon/techIcons.svg#${name}`}></use>
    </svg>
  );
};
export default TechIcon;

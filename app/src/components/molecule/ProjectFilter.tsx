import React from "react";
import useOnClickOutside from "../../hook/useOnClickOutside";
import FaIcon from "../atom/FaIcon";

export interface ProjectFilter {
  icon: string;
  content: React.ReactNode | null;
}

const ProjectFilterBtn: React.FC<ProjectFilter> = ({ icon, content }) => {
  const [isShowingContent, setShowingContent] = React.useState<boolean>(false);
  const contentRef = useOnClickOutside<HTMLDivElement>(() =>
    setShowingContent(false),
  );
  return isShowingContent && content ? (
    <div ref={contentRef}>{content}</div>
  ) : (
    <button
      onClick={() => setShowingContent(true)}
      className="size-11 grid place-items-center bg-base rounded-lg transition-colors"
    >
      <FaIcon name={icon} light />
    </button>
  );
};
export default ProjectFilterBtn;

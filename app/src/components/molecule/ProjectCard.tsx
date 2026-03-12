import type React from "react";
import type { Project } from "../../types/project";
import { getStatusColor, getProgressColor } from "../../utils/projectColor";
import DetailsButton from "../atom/buttons/Details";
import FaIcon from "../atom/FaIcon";

const ProjectCard: React.FC<{
  project: Project;
  index?: number;
  viewMode?: string;
  detailed?: boolean;
}> = ({ project, index = 1, viewMode = "grid", detailed = false }) => {
  return (
    <article
      className="project-card flex flex-col rounded-2xl p-4 border border-btn-border shadow-sm transition-transform ease-out hover:-translate-y-2 animate-slide-in"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div
        className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getStatusColor(project.status)}`}
      >
        {project.status.toUpperCase()}
      </div>
      <h3 className="text-xl font-bold text-font mb-1">{project.title}</h3>
      <p className="flex-1  text-icon text-sm font-medium mb-4">
        {project.client}
      </p>

      {project.tags && detailed ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-base text-font-light rounded border border-btn-border"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        ""
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        {viewMode === "list" ||
          (detailed && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-font-light">
                Progreso
              </span>
              <span className="text-xs font-bold text-font">
                {project.progress}%
              </span>
            </div>
          ))}
        <div className="h-2 bg-base rounded-full overflow-hidden">
          <div
            className={`progress-bar h-full bg-linear-to-r ${getProgressColor(project.status)} rounded-full`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Meta Info */}
      {detailed && (
        <div className="flex items-center justify-between gap-4 mb-4 text-xs text-font-light">
          {project.team && (
            <div className="flex items-center gap-1">
              <FaIcon name="users" size="size-3" />
              <span>{project.team} miembros</span>
            </div>
          )}
          {project.dueDate && (
            <div className="flex items-center gap-1">
              <FaIcon name="calendar" size="size-3" />
              <span>{project.dueDate}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-btn-border">
        <span className="text-xs text-font-light">
          Actualizado {project.lastUpdate}
        </span>
        <DetailsButton href={"/proyecto/" + project.id} />
      </div>
    </article>
  );
};
export default ProjectCard;

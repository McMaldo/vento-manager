import React, { useState } from "react";
import { Link } from "react-router-dom";
import FaIcon from "../atom/FaIcon";
import { getStatusColor, getProgressColor } from "../../utils/projectColor";
import type { Project } from "../../types/project";
import data from "../../demo/projects.json";

const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("recientes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [projects] = useState<Project[]>(data as Project[]);

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "todos" || project.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "recientes") return 0; // Mantener orden original
      if (sortBy === "progreso") return b.progress - a.progress;
      if (sortBy === "nombre") return a.title.localeCompare(b.title);
      return 0;
    });

  const statsData = [
    {
      label: "Total Proyectos",
      value: projects.length,
      icon: "folder",
    },
    {
      label: "Activos",
      value: projects.filter((p) => p.status === "activo").length,
      icon: "circle-play",
    },
    {
      label: "En Revisión",
      value: projects.filter((p) => p.status === "revisión").length,
      icon: "circle-check",
    },
    {
      label: "Completados",
      value: projects.filter((p) => p.status === "completado").length,
      icon: "circle-check",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-8 animate-slide-in">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold text-font mb-2">Mis Proyectos</h1>
            <p className="text-font-light text-lg">
              Gestiona y monitorea todos tus proyectos
            </p>
          </div>
          <button className="px-5 py-2.5 bg-icon text-mantle rounded-lg hover:bg-font transition-colors font-medium text-sm">
            Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-in"
        style={{ animationDelay: "0.1s" }}
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="border border-btn-border rounded-xl p-4 hover:shadow-lg transition-all select-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-font-light text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-font">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg bg-icon flex items-center justify-center`}
              >
                <FaIcon name={stat.icon} size="size-8" invert />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div
        className="border border-btn-border rounded-xl p-5 mb-8 animate-slide-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div
            className="relative flex items-center animate-scale-in border border-btn-border rounded-lg px-2"
            style={{ animationDelay: "0.2s" }}
          >
            <button className="size-10">
              <FaIcon name="magnifying-glass" light />
            </button>
            <input
              type="text"
              placeholder="Busca Proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 text-font text-lg focus:outline-none shadow-2xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FaIcon name="xmark" size="size-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:ring-opacity-50 bg-base text-font transition-all flex-1 lg:flex-initial"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="revisión">En Revisión</option>
              <option value="completado">Completados</option>
              <option value="pausado">Pausados</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:ring-opacity-50 bg-base text-font transition-all flex-1 lg:flex-initial"
            >
              <option value="recientes">Más Recientes</option>
              <option value="progreso">Por Progreso</option>
              <option value="nombre">Por Nombre</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-base rounded-xl border border-btn-border p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`size-10 grid place-items-center transition-colors rounded-md ${
                  viewMode === "grid" ? "bg-main text-font" : "hover:bg-base"
                }`}
              >
                <FaIcon
                  name="table-cells"
                  size="size-8"
                  invert={viewMode == "grid"}
                />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`size-10 grid place-items-center transition-colors rounded-md ${
                  viewMode == "list" ? "bg-main text-font" : "hover:bg-base"
                }`}
              >
                <FaIcon
                  name="table-list"
                  size="size-8"
                  invert={viewMode === "list"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card rounded-2xl p-4 border border-btn-border shadow-sm transition-transform ease-out hover:-translate-y-2 animate-slide-in ${
                viewMode === "list" ? "flex items-center gap-6" : ""
              }`}
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              <div className={viewMode === "list" ? "flex-1" : ""}>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex-1 ${viewMode === "list" ? "flex space-x-2 flex-wrap" : ""}`}
                  >
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${getStatusColor(project.status)}`}
                    >
                      {project.status.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold text-font">
                      {project.title}
                    </h3>
                    <p className="text-icon text-sm font-medium w-full">
                      {project.client}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {project.tags && (
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
                )}

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-font-light">
                      Progreso
                    </span>
                    <span className="text-xs font-bold text-font">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-base rounded-full overflow-hidden">
                    <div
                      className={`progress-bar h-full bg-linear-to-r ${getProgressColor(project.status)} rounded-full`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meta Info */}
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

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-btn-border">
                  <span className="text-xs text-font-light">
                    Actualizado {project.lastUpdate}
                  </span>
                  <Link
                    to={"/proyecto/" + project.id}
                    className="text-sm font-semibold text-icon hover:text-font transition-colors hover:bg-base px-3 py-2 rounded-md"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 animate-slide-in">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaIcon name="folder-open" size="size-10" light />
          </div>
          <h3 className="text-2xl font-bold text-font mb-2">
            No se encontraron proyectos
          </h3>
          <p className="text-font-light mb-6">
            Intenta ajustar los filtros o crear un nuevo proyecto
          </p>
          <Link
            to="/nuevo-proyecto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-main text-font font-semibold rounded-lg border border-btn-border hover:shadow-lg transition-all"
          >
            <FaIcon name="plus" size="size-5" />
            Crear Proyecto
          </Link>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;

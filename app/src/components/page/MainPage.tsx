import React, { useState } from "react";
import { Link } from "react-router-dom";
import { currentDate } from "../../utils/date";
import { getStatusColor, getProgressColor } from "../../utils/projectColor";
import type { Project } from "../../types/project";
import type { Delivery } from "../../types/delivery";
import data from "../../demo/projects.json";
import data2 from "../../demo/delivery.json";

const MainPage: React.FC = () => {
  const [projects] = useState<Project[]>(data as Project[]);
  const [deliveries] = useState<Delivery[]>(data2 as Delivery[]);

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-500";
      case "media":
        return "bg-amber-500";
      case "baja":
        return "bg-emerald-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <>
      <section className="mb-12 animate-fade-in">
        <div className="flex flex-col gap-2 sm:flex-row md:items-end justify-between mb-2">
          <div>
            <p className="text-font-light text-sm font-medium tracking-wide uppercase mb-2">
              {currentDate}
            </p>
            <h1 className="text-6xl font-bold text-font tracking-tight">
              Escritorio
            </h1>
          </div>
          <div className="flex sm:flex-col gap-3 md:flex-row">
            <button className="px-5 py-2.5 bg-icon text-mantle rounded-lg hover:bg-font transition-colors font-medium text-sm">
              Nuevo Proyecto
            </button>
            <Link
              to="/proyectos"
              className="px-5 py-2.5 border-2 border-font-light text-icon rounded-lg hover:bg-base transition-colors font-medium text-sm"
            >
              Ver Todos
            </Link>
          </div>
        </div>
        <div className="hidden md:block h-1 w-20 bg-main rounded-full mt-4"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Proyectos Recientes - Ocupa 2 columnas */}
        <section
          className="lg:col-span-2 animate-slide-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-icon">
              Proyectos Recientes
            </h2>
            <span className="text-sm text-font-light font-medium">
              {projects.filter((p) => p.status === "activo").length} activos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="project-card rounded-2xl p-4 border border-btn-border shadow-sm transition-transform ease-out hover:-translate-y-2"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getStatusColor(project.status)}`}
                    >
                      {project.status.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold text-font mb-1">
                      {project.title}
                    </h3>
                    <p className="text-icon text-sm font-medium">
                      {project.client}
                    </p>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-4">
                  <div className="h-2 bg-base rounded-full overflow-hidden">
                    <div
                      className={`progress-bar h-full bg-linear-to-r ${getProgressColor(project.status)} rounded-full`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-btn-border">
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
              </article>
            ))}
          </div>
        </section>

        {/* Próximas Entregas - Ocupa 1 columna */}
        <section
          className="animate-slide-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-icon">Próximas Entregas</h2>
            <span className="text-sm text-font-light font-medium">
              {deliveries.length} pendientes
            </span>
          </div>

          <div className="rounded-2xl p-6 border border-btn-border shadow-sm">
            <div className="space-y-4">
              {deliveries.map((delivery, index) => (
                <article
                  key={delivery.id}
                  className="delivery-item group p-4 rounded-xl border border-btn-border transition-transform ease-out hover:translate-x-2"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`size-2 group-hover:animate-pulse transition-all rounded-full mt-2 ${getPriorityIndicator(delivery.priority)} shrink-0`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-font mb-1 text-sm">
                        {delivery.title}
                      </h4>
                      <p className="text-xs text-icon mb-2 truncate">
                        {delivery.project}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-font-light font-medium">
                          {delivery.dueDate}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            delivery.daysLeft <= 5
                              ? "text-red-500"
                              : delivery.daysLeft <= 10
                                ? "text-amber-500"
                                : "text-emerald-500"
                          }`}
                        >
                          {delivery.daysLeft}d restantes
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-font-light text-icon rounded-xl hover:bg-base transition-colors font-semibold text-sm">
              Ver Todas las Entregas
            </button>
          </div>

          {/* Mini Estadísticas */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-linear-to-br from-amber-700 to-orange-700 rounded-xl p-5">
              <p className="text-sm font-medium font-icon mb-1">Proyectos</p>
              <p className="text-3xl font-bold">{projects.length}</p>
            </div>
            <div className="bg-linear-to-br from-emerald-700 to-teal-700 rounded-xl p-5">
              <p className="text-sm font-medium font-icon mb-1">Completados</p>
              <p className="text-3xl font-bold">
                {projects.filter((p) => p.status === "completado").length}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainPage;

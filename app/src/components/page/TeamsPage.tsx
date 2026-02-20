import React, { useState } from "react";
import { Link } from "react-router-dom";
import FaIcon from "../atom/FaIcon";
import type { Team } from "../../types/team";
import data from "../../demo/teams.json";

const TeamsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrivacy, setFilterPrivacy] = useState<string>("todos");

  const [teams] = useState<Team[]>(data as Team[]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "away":
        return "bg-amber-500";
      case "offline":
        return "bg-slate-400";
      default:
        return "bg-slate-400";
    }
  };

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrivacy =
      filterPrivacy === "todos" || team.privacy === filterPrivacy;
    return matchesSearch && matchesPrivacy;
  });

  const totalMembers = teams.reduce(
    (acc, team) => acc + team.members.length,
    0,
  );
  const totalProjects = teams.reduce((acc, team) => acc + team.projects, 0);

  return (
    <>
      {/* Header */}
      <div className="mb-8 animate-slide-in flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold text-font mb-2">Mis Equipos</h1>
          <p className="text-font-light text-lg">
            Colabora con tus equipos de trabajo
          </p>
        </div>
        <button className="px-5 py-2.5 bg-icon text-mantle rounded-lg hover:bg-font transition-colors font-medium text-sm">
          Nuevo Proyecto
        </button>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-in"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="border border-btn-border rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-light text-sm mb-1">Total de Equipos</p>
              <p className="text-3xl font-bold text-font">{teams.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-icon flex items-center justify-center">
              <FaIcon name="users" size="size-6" invert />
            </div>
          </div>
        </div>

        <div className="border border-btn-border rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-light text-sm mb-1">Total de Miembros</p>
              <p className="text-3xl font-bold text-font">{totalMembers}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-icon flex items-center justify-center">
              <FaIcon name="user-group" size="size-6" invert />
            </div>
          </div>
        </div>

        <div className="border border-btn-border rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-light text-sm mb-1">Proyectos Activos</p>
              <p className="text-3xl font-bold text-font">{totalProjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-icon flex items-center justify-center">
              <FaIcon name="folder" size="size-6" invert />
            </div>
          </div>
        </div>
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
              placeholder="Busca Equipos..."
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

          <div className="flex gap-3 w-full lg:w-auto">
            {/* Filter by Privacy */}
            <select
              value={filterPrivacy}
              onChange={(e) => setFilterPrivacy(e.target.value)}
              className="px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:ring-opacity-50 bg-base text-font transition-all flex-1 lg:flex-initial"
            >
              <option value="todos">Todos los equipos</option>
              <option value="public">Públicos</option>
              <option value="private">Privados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team, index) => (
            <article
              key={team.id}
              className="team-card rounded-2xl border border-btn-border shadow-sm animate-slide-in"
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              {/* Team Header with Gradient */}
              <div
                className={`h-16 flex justify-end bg-linear-to-r ${team.color} p-4 rounded-t-2xl`}
              >
                <div className="flex items-center gap-2">
                  {team.privacy === "private" && (
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FaIcon name="lock" size="size-3" invert />
                      <span className="text-xs text-base font-semibold">
                        Privado
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Info */}
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-font">{team.name}</h3>
                  <p className="text-font-light text-sm line-clamp-2">
                    {team.description}
                  </p>
                </div>

                {/* Members Avatars */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaIcon name="users" size="size-4" />
                    <span className="text-sm font-semibold text-font">
                      {team.members.length} miembros
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 5).map((member) => (
                      <div
                        key={member.id}
                        className="member-avatar relative group"
                        title={member.name}
                      >
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                        ></div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-base text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-font-light">{member.role}</div>
                        </div>
                      </div>
                    ))}
                    {team.members.length > 5 && (
                      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                        +{team.members.length - 5}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-btn-border gap-4 text-sm text-font-light">
                  <div className="flex items-center gap-1">
                    <FaIcon name="folder" size="size-4" light />
                    <span>{team.projects} proyectos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaIcon name="calendar" size="size-4" light />
                    <span>{team.createdDate}</span>
                  </div>
                  <Link
                    to={`/equipo/${team.id}`}
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
            <FaIcon name="users" size="size-10" />
          </div>
          <h3 className="text-2xl font-bold text-font mb-2">
            No se encontraron equipos
          </h3>
          <p className="text-font-light mb-6">
            Intenta ajustar los filtros o crear un nuevo equipo
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-main text-font font-semibold rounded-lg border border-btn-border hover:shadow-lg transition-all">
            <FaIcon name="plus" size="size-5" />
            Crear Equipo
          </button>
        </div>
      )}
    </>
  );
};

export default TeamsPage;

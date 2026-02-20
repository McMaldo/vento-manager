import React, { useState } from "react";
import FaIcon from "../atom/FaIcon";
import type { Column } from "../../types/column";
import KanbanPage from "./KanbanPage";
import { useParams } from "react-router-dom";
import data from "../../demo/parts.json";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams();

  const [isKanbanMode, setKanbanMode] = useState<boolean>(true);

  const [columns] = useState<Column[]>(data);

  return (
    <>
      {/* Header */}
      <section className="flex items-center justify-between pb-2">
        <div className="rounded-xl px-4 py-2 flex items-center gap-4 border border-btn-border">
          <div>
            <h1 className="text-xl font-bold pb-1">Proyecto: {projectId}</h1>
            <p className="text-sm text-gray-400">Mano hidráulica automata</p>
          </div>
          <button className="p-2 hover:bg-base rounded-lg transition-colors">
            <FaIcon name="gear" light />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {["magnifying-glass", "filter", "sort"].map((icon, index) => (
            <button
              key={index}
              className="size-11 grid place-items-center bg-base rounded-lg transition-colors"
            >
              <FaIcon name={icon} light />
            </button>
          ))}
          <div className="bg-base rounded-xl border border-btn-border p-1">
            <button
              className={`p-1 ${isKanbanMode ? "bg-main" : "hover:bg-base"} rounded-md aspect-square`}
              onClick={() => setKanbanMode(true)}
            >
              <FaIcon
                name="table-columns"
                size="size-8"
                invert={isKanbanMode}
              />
            </button>
            <button
              className={`p-1 ${!isKanbanMode ? "bg-main" : "hover:bg-base"} rounded-md aspect-square`}
              onClick={() => setKanbanMode(false)}
            >
              <FaIcon name="table-list" size="size-8" invert={!isKanbanMode} />
            </button>
          </div>
        </div>
      </section>

      {/* Kanban Board */}
      <section className="max-w-full overflow-y-hidden overflow-x-scroll custom-scroll-horizontal">
        {isKanbanMode ? <KanbanPage columns={columns} /> : <></>}
      </section>
    </>
  );
};

export default ProjectPage;

import React from "react";
import ColTableRow from "./ColTableMode";
import { useProjectColumns } from "../../context/ProjectContext";

const ProjectTableMode: React.FC = () => {
  const { cols } = useProjectColumns();

  const th = "text-left px-3 text-xs text-font";

  return (
    <table className="relative w-full min-w-4xl text-sm">
      <thead className="sticky top-0 bg-mantle z-2 h-8">
        <tr>
          <th className={th + " w-10"} />
          <th className={th}>Nombre</th>
          <th className={th}>Descripción</th>
          <th className={th}>Procesos</th>
          <th className={th}>Almacén</th>
          <th className={th} />
        </tr>
      </thead>
      <tbody>
        {cols.map((col) => (
          <ColTableRow key={col.id} col={col} />
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTableMode;

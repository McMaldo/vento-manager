import React, { useState } from "react";
import type { Column } from "../../types/column";
import ColTableRow from "./ColTableMode";

function uid() {
  return "x" + Date.now() + Math.random().toString(36).slice(2, 5);
}

const ProjectTableMode: React.FC<{ columns: Column[] }> = ({ columns }) => {
  const [cols, setCols] = useState<Column[]>(columns);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const e: Record<string, boolean> = {};
    columns.forEach((c) => (e["col_" + c.id] = true));
    return e;
  });
  const [dragPart, setDragPart] = useState<string | null>(null);
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const updateCol = (colId: string, field: string, value: string) =>
    setCols((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, [field]: value } : c)),
    );

  const updatePart = (
    colId: string,
    partId: string,
    field: string,
    value: string,
  ) =>
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.map((p) =>
                p.id !== partId ? p : { ...p, [field]: value },
              ),
            },
      ),
    );

  const addPart = (colId: string) => {
    const np = {
      id: uid(),
      title: "Nueva pieza",
      description: "",
      process: [],
      store: { id: 1, location: {} },
    };
    setCols((prev) =>
      prev.map((c) => (c.id !== colId ? c : { ...c, parts: [np, ...c.parts] })),
    );
    setExpanded((prev) => ({ ...prev, ["col_" + colId]: true }));
  };

  const delPart = (colId: string, partId: string) =>
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.filter((p) => p.id !== partId),
            },
      ),
    );

  const updateProc = (
    colId: string,
    partId: string,
    idx: number,
    field: string,
    value: string,
  ) =>
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.map((p) =>
                p.id !== partId
                  ? p
                  : {
                      ...p,
                      process: (p.process ?? []).map((pr, i) =>
                        i !== idx ? pr : { ...pr, [field]: value },
                      ),
                    },
              ),
            },
      ),
    );

  const toggleProc = (colId: string, partId: string, idx: number) =>
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.map((p) =>
                p.id !== partId
                  ? p
                  : {
                      ...p,
                      process: (p.process ?? []).map((pr, i) =>
                        i !== idx
                          ? pr
                          : { ...pr, isCompleted: !pr.isCompleted },
                      ),
                    },
              ),
            },
      ),
    );

  const addProc = (colId: string, partId: string) =>
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.map((p) =>
                p.id !== partId
                  ? p
                  : {
                      ...p,
                      process: [
                        ...(p.process ?? []),
                        { isCompleted: false, name: "Nuevo proceso" },
                      ],
                    },
              ),
            },
      ),
    );

  const delProc = (colId: string, partId: string, idx: number) =>
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.map((p) =>
                p.id !== partId
                  ? p
                  : {
                      ...p,
                      process: (p.process ?? []).filter((_, i) => i !== idx),
                    },
              ),
            },
      ),
    );

  const updateStore = (
    colId: string,
    partId: string,
    field: string,
    rawValue: string,
  ) => {
    const value = rawValue === "" ? undefined : Number(rawValue);
    setCols((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : {
              ...c,
              parts: c.parts.map((p) =>
                p.id !== partId
                  ? p
                  : {
                      ...p,
                      store: {
                        id: p.store?.id ?? 1,
                        location: {
                          ...(p.store?.location ?? {}),
                          [field]: value,
                        },
                      },
                    },
              ),
            },
      ),
    );
  };

  const handleDrop = (tgtColId: string, tgtPartId: string) => {
    if (!dragPart || dragPart === tgtPartId) return;
    setCols((prev) => {
      const next = prev.map((c) => ({ ...c, parts: [...c.parts] }));
      const srcCol = next.find((c) => c.id === dragCol);
      const tgtCol = next.find((c) => c.id === tgtColId);
      if (!srcCol || !tgtCol) return prev;
      const idx = srcCol.parts.findIndex((p) => p.id === dragPart);
      if (idx === -1) return prev;
      const [part] = srcCol.parts.splice(idx, 1);
      const tgtIdx = tgtCol.parts.findIndex((p) => p.id === tgtPartId);
      tgtCol.parts.splice(tgtIdx, 0, part);
      return next;
    });
    setDragOver(null);
  };

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
          <ColTableRow
            key={col.id}
            col={col}
            expanded={expanded}
            dragPart={dragPart}
            dragOver={dragOver}
            toggle={toggle}
            updateCol={updateCol}
            addPart={addPart}
            delPart={delPart}
            updatePart={updatePart}
            toggleProc={toggleProc}
            updateProc={updateProc}
            addProc={addProc}
            delProc={delProc}
            updateStore={updateStore}
            setDragPart={setDragPart}
            setDragCol={setDragCol}
            setDragOver={setDragOver}
            handleDrop={handleDrop}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTableMode;

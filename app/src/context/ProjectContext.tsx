// context/ColsContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Column } from "../types/column";

function uid() {
  return "x" + Date.now() + Math.random().toString(36).slice(2, 5);
}

type ProviderProps = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  children: ReactNode;
};

type ProjectColumnsContextValue = {
  cols: Column[];
  expanded: Record<string, boolean>;
  dragPart: string | null;
  dragCol: string | null;
  dragOver: string | null;
  // actions
  toggle: (key: string) => void;
  updateCol: (colId: string, field: string, value: string) => void;
  updatePart: (
    colId: string,
    partId: string,
    field: string,
    value: string,
  ) => void;
  addPart: (colId: string) => void;
  delPart: (colId: string, partId: string) => void;
  updateProc: (
    colId: string,
    partId: string,
    idx: number,
    field: string,
    value: string,
  ) => void;
  toggleProc: (colId: string, partId: string, idx: number) => void;
  addProc: (colId: string, partId: string) => void;
  delProc: (colId: string, partId: string, idx: number) => void;
  updateStore: (
    colId: string,
    partId: string,
    field: string,
    rawValue: string,
  ) => void;
  setDragPart: React.Dispatch<React.SetStateAction<string | null>>;
  setDragCol: React.Dispatch<React.SetStateAction<string | null>>;
  setDragOver: React.Dispatch<React.SetStateAction<string | null>>;
  handleDrop: (tgtColId: string, tgtPartId: string) => void;
};

const ProjectColumnsContext = createContext<ProjectColumnsContextValue | null>(
  null,
);

export const ProjectColumnsProvider = ({
  columns,
  setColumns,
  children,
}: ProviderProps) => {
  const [cols, setColsLocal] = useState<Column[]>(columns);
  useEffect(() => setColsLocal(columns), [columns]);

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const e: Record<string, boolean> = {};
    columns.forEach((c) => (e["col_" + c.id] = true));
    return e;
  });

  useEffect(() => {
    const e: Record<string, boolean> = {};
    cols.forEach((c) => (e["col_" + c.id] = expanded["col_" + c.id] ?? true));
    setExpanded(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols.length]);

  const [dragPart, setDragPart] = useState<string | null>(null);
  const [dragCol, setDragCol] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  // All actions operate on the outer setColumns (ProjectPage) so parent keeps control
  const updateCol = (colId: string, field: string, value: string) =>
    setColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, [field]: value } : c)),
    );

  const updatePart = (
    colId: string,
    partId: string,
    field: string,
    value: string,
  ) =>
    setColumns((prev) =>
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
    const np: Column["parts"][0] = {
      id: uid(),
      title: "Nueva pieza",
      description: "",
      process: [],
      store: { id: 1, location: {} },
    };
    setColumns((prev) =>
      prev.map((c) => (c.id !== colId ? c : { ...c, parts: [np, ...c.parts] })),
    );
    setExpanded((prev) => ({ ...prev, ["col_" + colId]: true }));
  };

  const delPart = (colId: string, partId: string) =>
    setColumns((prev) =>
      prev.map((c) =>
        c.id !== colId
          ? c
          : { ...c, parts: c.parts.filter((p) => p.id !== partId) },
      ),
    );

  const updateProc = (
    colId: string,
    partId: string,
    idx: number,
    field: string,
    value: string,
  ) =>
    setColumns((prev) =>
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
    setColumns((prev) =>
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
    setColumns((prev) =>
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
    setColumns((prev) =>
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
    setColumns((prev) =>
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
    setColumns((prev) => {
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

  // keep local cols in sync back to parent if needed
  useEffect(() => {
    setColsLocal(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const value: ProjectColumnsContextValue = {
    cols: columns,
    expanded,
    dragPart,
    dragCol,
    dragOver,
    toggle: (key: string) =>
      setExpanded((prev) => ({ ...prev, [key]: !prev[key] })),
    updateCol,
    updatePart,
    addPart,
    delPart,
    updateProc,
    toggleProc,
    addProc,
    delProc,
    updateStore,
    setDragPart,
    setDragCol,
    setDragOver,
    handleDrop,
  };

  return (
    <ProjectColumnsContext.Provider value={value}>
      {children}
    </ProjectColumnsContext.Provider>
  );
};

export const useProjectColumns = () => {
  const ctx = useContext(ProjectColumnsContext);
  if (!ctx)
    throw new Error(
      "useProjectColumns must be used within ProjectColumnsProvider",
    );
  return ctx;
};

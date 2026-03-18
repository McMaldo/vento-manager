import type { Column } from "../types/column";
import type { Part } from "../types/part";
import type { SortConfig } from "../types/sort";

const getProgress = (part: Part): number => {
  const procs = part.process ?? [];
  if (procs.length === 0) return -1;
  return procs.filter((pr) => pr.isCompleted).length / procs.length;
};

const getStoreValue = (part: Part): number => part.store?.id ?? Infinity;

export const sortCols = (
  cols: Column[],
  config: SortConfig | null,
): Column[] => {
  if (!config) return cols;
  const { field, order } = config;
  const dir = order === "asc" ? 1 : -1;

  return cols.map((col) => ({
    ...col,
    parts: [...col.parts].sort((a, b) => {
      switch (field) {
        case "title":
          return a.title.localeCompare(b.title) * dir;
        case "description":
          return a.description.localeCompare(b.description) * dir;
        case "progress":
          return (getProgress(a) - getProgress(b)) * dir;
        case "store":
          return (getStoreValue(a) - getStoreValue(b)) * dir;
        default:
          return 0;
      }
    }),
  }));
};

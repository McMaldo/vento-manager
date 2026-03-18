import type { Column } from "../types/column";

export const searchCols = (cols: Column[], query: string): Column[] => {
  if (!query.trim()) return cols;
  const q = query.toLowerCase();

  return cols
    .map((col) => ({
      ...col,
      parts: col.parts.filter((part) => {
        const matchTitle = part.title.toLowerCase().includes(q);
        const matchDesc = part.description.toLowerCase().includes(q);
        const matchProc = (part.process ?? []).some((pr) =>
          pr.name.toLowerCase().includes(q),
        );
        const matchStore =
          part.store != null && String(part.store.id).includes(q);

        return matchTitle || matchDesc || matchProc || matchStore;
      }),
    }))
    .filter(
      (col) =>
        col.title.toLowerCase().includes(q) ||
        col.description.toLowerCase().includes(q) ||
        col.parts.length > 0,
    );
};

export type SortField = "title" | "description" | "progress" | "store";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

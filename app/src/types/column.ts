import type { Part } from "./part";

export interface Column {
  id: string;
  title: string;
  description: string;
  color: string;
  parts: Part[];
}

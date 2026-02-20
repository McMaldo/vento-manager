export interface Project {
  id: string;
  title: string;
  client: string;
  progress: number;
  status: "activo" | "revisión" | "completado" | "pausado";
  lastUpdate: string;
  dueDate?: string;
  team?: number;
  tags?: string[];
}

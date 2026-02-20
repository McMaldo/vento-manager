export interface Delivery {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  daysLeft: number;
}

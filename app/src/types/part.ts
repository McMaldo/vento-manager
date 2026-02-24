export interface Process {
  isCompleted: boolean;
  name: string;
}

export interface Part {
  id: string;
  img?: string;
  title: string;
  description: string;
  process?: Process[];
}

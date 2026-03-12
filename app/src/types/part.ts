export interface Process {
  isCompleted: boolean;
  name: string;
}

export interface Store {
  id: number; // 1, 2, 3, 4, 5
  location: {
    rack?: number; // Estante
    column?: number; // Columna
    row?: number; // Fila
  };
}

export interface Part {
  id: string;
  img?: string;
  title: string;
  description: string;
  process?: Process[];
  store?: Store;
}

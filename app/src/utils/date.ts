const meses: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const diaSemana: string[] = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

export const date: Date = new Date();

export const currentDate: string = `${diaSemana[date.getDay()]}, ${date.getDate()} ${meses[date.getMonth()]} ${date.getFullYear()}`;

export const daysLeft = (date1: string): number => {
  const delivery = new Date(date1);
  const diffMs = Math.abs(date.getTime() - delivery.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
};

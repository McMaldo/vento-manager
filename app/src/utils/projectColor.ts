export const getStatusColor = (status: string) => {
  switch (status) {
    case "activo":
      return "bg-emerald-700 text-emerald-100 border border-emerald-600";
    case "revisión":
      return "bg-amber-700 text-amber-100 border border-amber-600";
    case "completado":
      return "bg-blue-700 text-blue-100 border border-blue-600";
    case "pausado":
    default:
      return "bg-slate-600 text-slate-300 border border-slate-500";
  }
};

export const getProgressColor = (status: string) => {
  switch (status) {
    case "activo":
      return "from-emerald-700 to-teal-700";
    case "revisión":
      return "from-amber-600 to-amber-700";
    case "completado":
      return "from-blue-700 to-indigo-500";
    case "pausado":
    default:
      return "from-slate-400 to-slate-500";
  }
};

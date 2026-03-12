export const getStatusColor = (status?: string) => {
  switch (status) {
    case "activo":
      return "bg-emerald-300 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100";
    case "revisión":
      return "bg-amber-200 text-amber-700 dark:bg-amber-700 dark:text-amber-100";
    case "completado":
      return "bg-blue-300 text-blue-700 dark:bg-blue-700 dark:text-blue-100";
    case "pausado":
    default:
      return "bg-slate-300 text-slate-600 dark:bg-slate-600 dark:text-slate-300";
  }
};

export const getProgressColor = (status?: string) => {
  switch (status) {
    case "activo":
      return "from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700";
    case "revisión":
      return "from-amber-300 to-amber-200 dark:from-amber-600 dark:to-amber-700";
    case "completado":
      return "from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-500";
    case "pausado":
    default:
      return "from-slate-400 to-slate-300 dark:from-slate-400 dark:to-slate-500";
  }
};

export const getGradient: (id?: number) => string = (id = 1) => {
  switch (id) {
    case 2:
      return "bg-linear-to-r from-main to-blue-200 dark:from-purple-600 dark:via-indigo-600 dark:to-blue-600";
    case 1:
    default:
      return "bg-linear-to-br from-main to-blue-300  dark:from-purple-600 dark:via-indigo-600 dark:to-blue-700";
  }
};

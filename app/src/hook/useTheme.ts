import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "mocha" | "latte" | "system";

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "system",
  );

  useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Escucha cambios del sistema si el tema es "system"
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () =>
      document.documentElement.setAttribute("data-theme", getSystemTheme());

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;

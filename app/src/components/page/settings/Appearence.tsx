import { useEffect, useState } from "react";
import useTheme, { type Theme } from "../../../hook/useTheme";

const AppearenceSettings = () => {
  const { theme, setTheme } = useTheme();
  const themeList: { value: Theme; label: string }[] = [
    { value: "light", label: "Claro" },
    { value: "dark", label: "Oscuro" },
    { value: "system", label: "Sistema" },
  ];

  const [idioma, setIdioma] = useState("es");
  useEffect(() => {
    document.documentElement.setAttribute("lang", idioma);
  }, [idioma]);
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-font font-semibold mb-4">
          Tema de la interfaz
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {themeList.map((themeBtn, index) => (
            <button
              key={index}
              onClick={() => setTheme(themeBtn.value)}
              className={`p-6 rounded-xl border-2 transition-all ${
                theme === themeBtn.value
                  ? "border-font bg-base shadow-lg"
                  : "border-btn-border hover:border-font-light"
              }`}
            >
              <div
                className={
                  "w-full h-20 bg-linear-to-r rounded-lg mb-3 border border-btn-border " +
                  (themeBtn.value === "light"
                    ? "from-gray-100 to-gray-200"
                    : themeBtn.value === "dark"
                      ? "from-gray-600 to-gray-900"
                      : "from-gray-200 via-gray-400 to-gray-900")
                }
              ></div>
              <p className="text-font font-semibold text-sm">
                {themeBtn.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-font font-semibold mb-2">
          Tamaño de fuente
        </label>
        <select
          className="w-full px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 bg-base text-font transition-all"
          defaultValue="Mediano"
        >
          <option>Pequeño</option>
          <option>Mediano</option>
          <option>Grande</option>
        </select>
      </div>

      <div>
        <label className="block text-font font-semibold mb-2">Idioma</label>
        <select
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
          className="w-full px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 bg-base text-font transition-all"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>
  );
};
export default AppearenceSettings;

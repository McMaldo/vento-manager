import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { link } from "../../types/link";
import FaIcon from "../atom/FaIcon.tsx";

export default function Aside() {
  const [isExpanded, setExpanded] = useState(false);
  const location = useLocation();

  const btns: link[] = [
    { icon: "house", name: "inicio", href: "inicio" },
    { icon: "folder", name: "proyectos", href: "proyectos" },
    { icon: "user-group", name: "equipos", href: "equipos" },
    { icon: "gear", name: "ajustes", href: "ajustes" },
    { icon: "sun", name: "apariencia", href: "ajustes/apariencia" },
    { icon: "question-circle", name: "ayuda", href: "ayuda" },
    { icon: "info-circle", name: "acerca", href: "acerca" },
  ];

  // Calcula la página actual desde la URL — sin onClick ni estado manual
  const currentPageName =
    btns.find((btn) => location.pathname === "/" + btn.href)?.name ??
    btns.find((btn) => location.pathname.startsWith("/" + btn.href))?.name ??
    (location.pathname.includes("/proyecto/") ? "proyectos" : "inicio");

  const [btnHover, setBtnHover] = useState({ top: 0 });
  const linkContainer = useRef(null);
  const [currentTop, setCurrentTop] = useState(0);

  // Actualiza la posición del marker cuando cambia la página
  useEffect(() => {
    const activeBtn = document.querySelector(`#aside-${currentPageName}`);
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      setCurrentTop(rect.top - 64);
      setBtnHover({ top: rect.top - 64 });
    }
  }, [currentPageName]);

  return (
    <aside
      id="aside"
      ref={linkContainer}
      className={
        "[grid-area:aside] relative flex flex-col bg-base transition-all " +
        (isExpanded ? "w-50" : "w-17")
      }
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {btns.map((btn, index) => (
        <Link
          key={index}
          id={"aside-" + btn.name}
          to={btn.href}
          className={`capitalize relative w-full flex items-center p-4 gap-4 transition-colors ${
            currentPageName === btn.name
              ? "bg-btn rounded-2xl"
              : "cursor-pointer hover:bg-mantle"
          }`}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setBtnHover({ top: rect.top - 64 });
          }}
          onMouseLeave={() => setBtnHover({ top: currentTop })}
        >
          <FaIcon
            name={btn.icon}
            size="size-9"
            light={btn.name === "question-circle" || btn.name === "info-circle"}
          />
          <span
            className={`text-2xl overflow-hidden transition-color ${
              isExpanded ? "text-font" : "hidden text-transparent"
            }`}
          >
            {btn.name}
          </span>
        </Link>
      ))}
      <div
        id="aside-marker"
        className="absolute left-0 w-2 h-17 transition-all duration-200 py-4"
        style={{
          top: btnHover.top,
        }}
      >
        <div className="h-full w-7/10 bg-main rounded-r-full"></div>
      </div>

      <article className="w-full flex items-center p-4 pb-8 gap-2 mt-auto">
        <Link to="ajustes/cuenta" title="Ajustes del Perfil">
          <FaIcon name="circle-user" size="size-9" />
        </Link>
        <Link
          to="ajustes/cuenta"
          title="Ajustes del Perfil"
          className={`flex-1 overflow-hidden text-ellipsis whitespace-nowrap transition-color py-2 ${isExpanded ? "text-font" : "hidden text-transparent"}`}
        >
          UserName
        </Link>
        <button
          className={`transition-opacity ${isExpanded ? "opacity-100" : "hidden opacity-0"}`}
          title="Cerrar Sesión"
        >
          <FaIcon name="power-off" size="power-off size-8" />
        </button>
      </article>
    </aside>
  );
}

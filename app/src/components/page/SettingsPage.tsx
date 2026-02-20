import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FaIcon from "../atom/FaIcon";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();

  const [activeSection, setActiveSection] = useState(section || "cuenta");
  const [notificaciones, setNotificaciones] = useState({
    email: true,
    push: false,
    sms: true,
    actualizaciones: true,
  });
  const [tema, setTema] = useState("claro");
  const [idioma, setIdioma] = useState("es");
  const [privacidad, setPrivacidad] = useState({
    perfilPublico: false,
    mostrarEmail: false,
    analiticas: true,
  });

  const sections: SettingsSection[] = [
    {
      id: "cuenta",
      title: "Cuenta",
      description: "Gestiona tu información personal",
      icon: "circle-user",
    },
    {
      id: "notificaciones",
      title: "Notificaciones",
      description: "Configura tus alertas",
      icon: "bell",
    },
    {
      id: "apariencia",
      title: "Apariencia",
      description: "Personaliza la interfaz",
      icon: "palette",
    },
    {
      id: "privacidad",
      title: "Privacidad",
      description: "Control de datos y seguridad",
      icon: "lock",
    },
    {
      id: "integraciones",
      title: "Integraciones",
      description: "Conecta herramientas externas",
      icon: "plug",
    },
  ];

  // Sincronizar activeSection con la URL
  useEffect(() => {
    if (section) {
      setActiveSection(section);
    }
  }, [section]);

  // Función para cambiar de sección y actualizar la URL
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/ajustes/${sectionId}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "cuenta":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-font font-semibold mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                defaultValue="Usuario Demo"
                className="w-full px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-base text-font transition-all"
              />
            </div>
            <div>
              <label className="block text-font font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="demo@vento.com"
                className="w-full px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-base text-font transition-all"
              />
            </div>
            <div>
              <label className="block text-font font-semibold mb-2">
                Cargo
              </label>
              <input
                type="text"
                defaultValue="Testing"
                className="w-full px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-base text-font transition-all"
              />
            </div>
            <div>
              <label className="block text-font font-semibold mb-2">
                Biografía
              </label>
              <textarea
                rows={4}
                defaultValue="En búsqueda de puntos por fortalecer en la app de Vento Manager"
                className="w-full px-4 py-3 border border-btn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-base text-font transition-all resize-none"
              />
            </div>
            <div className="pt-4 border-t border-btn-border">
              <button className="px-6 py-3 bg-base text-font font-semibold rounded-lg border border-btn-border hover:shadow-lg transition-all">
                Guardar Cambios
              </button>
            </div>
          </div>
        );

      case "notificaciones":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">
                  Notificaciones por Email
                </h4>
                <p className="text-font-light text-sm">
                  Recibe actualizaciones en tu correo
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.email}
                  onChange={(e) =>
                    setNotificaciones({
                      ...notificaciones,
                      email: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">
                  Notificaciones Push
                </h4>
                <p className="text-font-light text-sm">
                  Alertas en tiempo real
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.push}
                  onChange={(e) =>
                    setNotificaciones({
                      ...notificaciones,
                      push: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">Mensajes SMS</h4>
                <p className="text-font-light text-sm">
                  Avisos importantes por texto
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.sms}
                  onChange={(e) =>
                    setNotificaciones({
                      ...notificaciones,
                      sms: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">
                  Actualizaciones del Sistema
                </h4>
                <p className="text-font-light text-sm">Novedades y mejoras</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.actualizaciones}
                  onChange={(e) =>
                    setNotificaciones({
                      ...notificaciones,
                      actualizaciones: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>
          </div>
        );

      case "apariencia":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-font font-semibold mb-4">
                Tema de la interfaz
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setTema("claro")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    tema === "claro"
                      ? "border-font bg-base shadow-lg"
                      : "border-btn-border hover:border-font-light"
                  }`}
                >
                  <div className="w-full h-20 bg-linear-to-br from-white to-gray-100 rounded-lg mb-3 border border-btn-border"></div>
                  <p className="text-font font-semibold text-sm">Claro</p>
                </button>
                <button
                  onClick={() => setTema("oscuro")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    tema === "oscuro"
                      ? "border-font bg-base shadow-lg"
                      : "border-btn-border hover:border-font-light"
                  }`}
                >
                  <div className="w-full h-20 bg-linear-to-br from-gray-800 to-gray-900 rounded-lg mb-3"></div>
                  <p className="text-font font-semibold text-sm">Oscuro</p>
                </button>
                <button
                  onClick={() => setTema("auto")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    tema === "auto"
                      ? "border-font bg-base shadow-lg"
                      : "border-btn-border hover:border-font-light"
                  }`}
                >
                  <div className="w-full h-20 bg-linear-to-r from-white via-gray-400 to-gray-900 rounded-lg mb-3"></div>
                  <p className="text-font font-semibold text-sm">Automático</p>
                </button>
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
              <label className="block text-font font-semibold mb-2">
                Idioma
              </label>
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

      case "privacidad":
        return (
          <div className="space-y-6">
            <div className="p-5 bg-base border border-btn-border rounded-xl">
              <p className="text-font-light text-sm leading-relaxed">
                Tu privacidad es importante. Controla qué información compartes
                y cómo se utiliza en la plataforma.
              </p>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">Perfil Público</h4>
                <p className="text-font-light text-sm">
                  Permite que otros usuarios vean tu perfil
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacidad.perfilPublico}
                  onChange={(e) =>
                    setPrivacidad({
                      ...privacidad,
                      perfilPublico: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">Mostrar Email</h4>
                <p className="text-font-light text-sm">
                  Email visible en tu perfil público
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacidad.mostrarEmail}
                  onChange={(e) =>
                    setPrivacidad({
                      ...privacidad,
                      mostrarEmail: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-btn-border">
              <div>
                <h4 className="text-font font-semibold mb-1">
                  Analíticas de Uso
                </h4>
                <p className="text-font-light text-sm">
                  Ayúdanos a mejorar el producto
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacidad.analiticas}
                  onChange={(e) =>
                    setPrivacidad({
                      ...privacidad,
                      analiticas: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-base border-2 border-btn-border rounded-full peer peer-checked:bg-base peer-checked:border-font transition-all"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-font-light rounded-full peer-checked:translate-x-7 peer-checked:bg-font transition-all"></div>
              </label>
            </div>

            <div className="pt-4">
              <button className="px-6 py-3 text-font-light border border-btn-border rounded-lg hover:bg-base transition-all font-semibold">
                Descargar mis datos
              </button>
            </div>
          </div>
        );

      case "integraciones":
        return (
          <div className="space-y-4">
            <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    G
                  </div>
                  <div>
                    <h4 className="text-font font-semibold">
                      Google Workspace
                    </h4>
                    <p className="text-font-light text-sm">
                      Gmail, Drive, Calendar
                    </p>
                  </div>
                </div>
                <button className="px-5 py-2 bg-base border border-btn-border text-font font-semibold rounded-lg hover:shadow-md transition-all">
                  Conectar
                </button>
              </div>
            </div>

            <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    S
                  </div>
                  <div>
                    <h4 className="text-font font-semibold">Slack</h4>
                    <p className="text-font-light text-sm">
                      Conectado • Canal: #proyectos
                    </p>
                  </div>
                </div>
                <button className="px-5 py-2 border-2 border-btn-border text-font-light font-semibold rounded-lg hover:bg-base transition-all">
                  Desconectar
                </button>
              </div>
            </div>

            <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    T
                  </div>
                  <div>
                    <h4 className="text-font font-semibold">Trello</h4>
                    <p className="text-font-light text-sm">
                      Gestión de tareas y tableros
                    </p>
                  </div>
                </div>
                <button className="px-5 py-2 bg-base border border-btn-border text-font font-semibold rounded-lg hover:shadow-md transition-all">
                  Conectar
                </button>
              </div>
            </div>

            <div className="p-6 border border-btn-border rounded-xl hover:shadow-lg transition-all bg-base">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    F
                  </div>
                  <div>
                    <h4 className="text-font font-semibold">Figma</h4>
                    <p className="text-font-light text-sm">
                      Diseño colaborativo
                    </p>
                  </div>
                </div>
                <button className="px-5 py-2 bg-base border border-btn-border text-font font-semibold rounded-lg hover:shadow-md transition-all">
                  Conectar
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div className="mb-12 animate-slide-left">
          <h1 className="text-5xl font-black text-font mb-3">Configuración</h1>
          <p className="text-font-light text-lg">
            Personaliza tu experiencia y gestiona tu cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navegación */}
          <div
            className="lg:col-span-1 animate-slide-left"
            style={{ animationDelay: "0.1s" }}
          >
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`section-item w-full text-left p-4 rounded-xl border transition-all ease-out hover:translate-x-2 ${
                    activeSection === section.id
                      ? "bg-base border-font shadow-lg"
                      : "border-btn-border hover:bg-base hover:border-font-light"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FaIcon name={section.icon} size="size-6" />
                    <h3
                      className={`font-bold ${activeSection === section.id ? "text-font" : "text-font"}`}
                    >
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-font-light text-sm">
                    {section.description}
                  </p>
                </button>
              ))}
            </nav>

            {/* Info adicional */}
            <div className="mt-8 p-5 bg-base border border-btn-border rounded-xl">
              <h4 className="text-font font-bold mb-2 text-sm">
                ¿Necesitas ayuda?
              </h4>
              <p className="text-font-light text-xs mb-3">
                Visita nuestro centro de ayuda para más información
              </p>
              <Link
                to="/ayuda"
                className="text-font text-xs font-semibold hover:underline"
              >
                Ver documentación →
              </Link>
            </div>
          </div>

          {/* Contenido principal */}
          <section
            className="lg:col-span-3 animate-slide-right"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="border border-btn-border rounded-2xl p-8 shadow-sm">
              <div className="mb-6 pb-6 border-b border-btn-border">
                <h2 className="text-3xl font-bold text-font mb-2">
                  {sections.find((s) => s.id === activeSection)?.title}
                </h2>
                <p className="text-font-light">
                  {sections.find((s) => s.id === activeSection)?.description}
                </p>
              </div>

              {renderContent()}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FaIcon from "../atom/FaIcon";
import HelpQuestion from "../molecule/HelpQuestion";
import AccountSettings from "./settings/Account";
import NotificationsSettings from "./settings/Notifications";
import AppearenceSettings from "./settings/Appearence";
import PrivacySettings from "./settings/Privacy";
import IntegrationsSettings from "./settings/Integrations";
import useWindowWidth from "../../hook/useWindowWidth";

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
  const isMobile = useWindowWidth() < 768;

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
        return <AccountSettings />;
      case "notificaciones":
        return <NotificationsSettings />;
      case "apariencia":
        return <AppearenceSettings />;
      case "privacidad":
        return <PrivacySettings />;
      case "integraciones":
        return <IntegrationsSettings />;
      default:
        return null;
    }
  };

  return (
    <>
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
          <nav className="space-y-2 md:mb-8 ">
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
                <p className="text-font-light text-sm">{section.description}</p>
              </button>
            ))}
          </nav>
          {!isMobile && <HelpQuestion />}
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

        {isMobile && <HelpQuestion />}
      </div>
    </>
  );
};

export default SettingsPage;

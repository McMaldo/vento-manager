import React, { useState } from "react";
import FaIcon from "../atom/FaIcon";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories: HelpCategory[] = [
    {
      id: "inicio",
      title: "Primeros Pasos",
      description: "Aprende lo básico para comenzar",
      icon: "rocket",
      articleCount: 12,
    },
    {
      id: "proyectos",
      title: "Gestión de Proyectos",
      description: "Organiza y administra tu trabajo",
      icon: "folder",
      articleCount: 18,
    },
    {
      id: "colaboracion",
      title: "Colaboración",
      description: "Trabaja en equipo eficientemente",
      icon: "users",
      articleCount: 15,
    },
    {
      id: "integraciones",
      title: "Integraciones",
      description: "Conecta tus herramientas favoritas",
      icon: "plug",
      articleCount: 9,
    },
    {
      id: "cuenta",
      title: "Cuenta y Facturación",
      description: "Gestiona tu suscripción y pagos",
      icon: "credit-card",
      articleCount: 11,
    },
    {
      id: "seguridad",
      title: "Seguridad y Privacidad",
      description: "Protege tu información",
      icon: "shield-halved",
      articleCount: 8,
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "¿Cómo creo mi primer proyecto?",
      answer:
        "Para crear tu primer proyecto, haz clic en el botón 'Nuevo Proyecto' en la esquina superior derecha del escritorio. Completa el nombre del proyecto, selecciona un cliente (opcional) y presiona 'Crear'. Automáticamente se abrirá el panel del proyecto donde podrás agregar tareas, asignar miembros y establecer fechas de entrega.",
      category: "inicio",
    },
    {
      id: "2",
      question: "¿Puedo invitar a colaboradores externos?",
      answer:
        "Sí, puedes invitar a colaboradores externos desde la sección 'Equipo' de cualquier proyecto. Ve a Configuración > Miembros del equipo y haz clic en 'Invitar colaborador'. Ingresa su email y selecciona el nivel de permisos (Visualizador, Editor o Administrador). Recibirán una invitación por correo electrónico.",
      category: "colaboracion",
    },
    {
      id: "3",
      question: "¿Cómo cambio mi plan de suscripción?",
      answer:
        "Para cambiar tu plan, ve a Configuración > Cuenta > Suscripción. Ahí verás todos los planes disponibles. Al seleccionar uno nuevo, se calculará la diferencia prorrateada. Los cambios se aplican inmediatamente y tu próxima factura reflejará el nuevo precio. Puedes actualizar o reducir tu plan en cualquier momento.",
      category: "cuenta",
    },
    {
      id: "4",
      question: "¿Mis datos están encriptados?",
      answer:
        "Sí, todos los datos están encriptados tanto en tránsito (TLS 1.3) como en reposo (AES-256). Utilizamos servidores certificados SOC 2 y cumplimos con GDPR y otras regulaciones de privacidad. Nunca compartimos tu información con terceros sin tu consentimiento explícito.",
      category: "seguridad",
    },
    {
      id: "5",
      question: "¿Cómo establezco fechas de entrega para las tareas?",
      answer:
        "Abre la tarea que deseas configurar, haz clic en el campo 'Fecha de entrega' y selecciona una fecha del calendario. Opcionalmente, puedes agregar una hora específica. Las tareas próximas a vencer aparecerán destacadas en tu panel de entregas con alertas automáticas 24 horas antes.",
      category: "proyectos",
    },
    {
      id: "6",
      question: "¿Puedo exportar mis proyectos?",
      answer:
        "Sí, desde la vista de cualquier proyecto, haz clic en el menú de opciones (⋮) y selecciona 'Exportar'. Podrás elegir entre formatos PDF (para reportes), CSV (para datos de tareas) o JSON (para respaldo completo). Los informes en PDF incluyen gráficos de progreso y estadísticas.",
      category: "proyectos",
    },
    {
      id: "7",
      question: "¿Qué hago si olvido mi contraseña?",
      answer:
        "En la pantalla de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Ingresa tu email registrado y recibirás un enlace de recuperación válido por 24 horas. Al hacer clic en el enlace, podrás establecer una nueva contraseña. Por seguridad, todas las sesiones activas se cerrarán automáticamente.",
      category: "cuenta",
    },
  ];

  const filteredFAQs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : activeCategory
      ? faqs.filter((faq) => faq.category === activeCategory)
      : faqs;

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="grid place-items-center bg-linear-to-r from-purple-800 via-indigo-600 to-blue-700 text-font rounded-lg p-4 min-h-1/2">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-6xl font-black mb-6 tracking-tight">
            Centro de Ayuda
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Encuentra respuestas rápidas, guías detalladas y soporte para sacar
            el máximo provecho de la plataforma
          </p>

          {/* Search Bar */}
          <div
            className="relative flex items-center max-w-2xl mx-auto animate-scale-in border border-icon rounded-2xl px-4"
            style={{ animationDelay: "0.2s" }}
          >
            <button className="size-10">
              <FaIcon name="magnifying-glass" />
            </button>
            <input
              type="text"
              placeholder="Busca tu pregunta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 text-font text-lg focus:outline-none shadow-2xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FaIcon name="xmark" size="size-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        {/* Categories Grid */}
        {!searchQuery && !activeCategory && (
          <>
            <div
              className="mb-12 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="text-4xl font-bold text-font mb-3">
                Explora por Categoría
              </h2>
              <p className="text-font-light text-lg">
                Selecciona un tema para ver artículos relacionados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="category-card rounded-2xl p-6 border border-btn-border hover:border-font-light shadow-lg hover:shadow-2xl text-left animate-scale-in"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="flex gap-4 items-center">
                    <div className="bg-main w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                      <FaIcon name={category.icon} size="size-8" invert />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-font mb-2">
                        {category.title}
                      </h3>
                      <p className="text-font-light text-sm mb-4">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-main bg-btn px-3 py-1 rounded-full">
                      {category.articleCount} artículos
                    </span>
                    <div className="flex items-center gap-2 text-font-light hover:text-main">
                      <span>Ver Categoría</span>
                      <FaIcon name="arrow-right" size="size-4" light />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Category Header with Back Button */}
        {activeCategory && (
          <div className="mb-8 animate-fade-up">
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-font-light hover:text-font font-semibold mb-4 transition-colors"
            >
              <FaIcon name="arrow-left" size="size-4" />
              Volver a categorías
            </button>
            <h2 className="text-4xl font-bold text-font mb-2">
              {categories.find((c) => c.id === activeCategory)?.title}
            </h2>
            <p className="text-font-light text-lg">
              {categories.find((c) => c.id === activeCategory)?.description}
            </p>
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 animate-fade-up">
            <h2 className="text-4xl font-bold text-font mb-2">
              Resultados de búsqueda
            </h2>
            <p className="text-font-light text-lg">
              {filteredFAQs.length} resultado
              {filteredFAQs.length !== 1 ? "s" : ""} para "{searchQuery}"
            </p>
          </div>
        )}

        {/* FAQs Section */}
        {(searchQuery ||
          activeCategory ||
          (!searchQuery && !activeCategory)) && (
          <>
            {!searchQuery && !activeCategory && (
              <div
                className="mb-8 animate-fade-up"
                style={{ animationDelay: "0.4s" }}
              >
                <h2 className="text-4xl font-bold text-font mb-3">
                  Preguntas Frecuentes
                </h2>
                <p className="text-font-light text-lg">
                  Las dudas más comunes resueltas
                </p>
              </div>
            )}

            <div
              className="space-y-4 max-w-4xl animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="faq-item rounded-xl border-2 border-btn-border hover:border-font-light shadow-md overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-base transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-bold text-font mb-1">
                          {faq.question}
                        </h3>
                        <span className="text-xs font-semibold text-main bg-base px-2 py-1 rounded">
                          {categories.find((c) => c.id === faq.category)?.title}
                        </span>
                      </div>
                      <FaIcon
                        name={
                          expandedFAQ === faq.id ? "chevron-up" : "chevron-down"
                        }
                        size="size-5"
                      />
                    </button>
                    <div
                      className={`faq-answer ${expandedFAQ === faq.id ? "expanded" : ""}`}
                    >
                      <div className="px-8 py-4 border-t border-btn-border bg-base">
                        <p className="text-icon leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaIcon name="magnifying-glass" size="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-font mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-font-light mb-6">
                    Intenta con otros términos de búsqueda
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(null);
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Contact Support Section */}
        <div
          className="flex flex-col items-center mt-20 bg-linear-to-r from-main to-teal-700 rounded-3xl p-12 text-mantle text-center animate-scale-in"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-4xl font-bold mb-4">¿Aún necesitas ayuda?</h2>
          <p className="text-mantle text-lg mb-8 max-w-2xl mx-auto">
            Nuestro equipo de soporte está disponible todos los días para
            resolver tus dudas y ayudarte con cualquier problema
          </p>
          <a
            href="mailto:maldonado.ignacio.pablo@gmail.com"
            className="px-8 py-4 bg-mantle text-font font-bold rounded-xl hover:shadow-2xl transition-all flex items-center gap-2"
          >
            <FaIcon name="envelope" />
            Enviar un email
          </a>
        </div>
      </section>
    </>
  );
};

export default HelpPage;

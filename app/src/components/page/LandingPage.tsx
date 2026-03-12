import React from "react";
import FaIcon from "../atom/FaIcon";
import Logo from "../atom/Logo";
import Footer from "../partial/Footer";
import { getGradient } from "../../utils/gradient";

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Stat {
  label: string;
  value: string;
  icon: string;
}

const LandingPage: React.FC = () => {
  const values: CompanyValue[] = [
    {
      id: "1",
      title: "Innovación Constante",
      description:
        "Creemos en evolucionar continuamente para ofrecer las mejores herramientas y experiencias a nuestros usuarios.",
      icon: "lightbulb",
    },
    {
      id: "2",
      title: "Colaboración Primero",
      description:
        "Diseñamos cada función pensando en cómo los equipos trabajan juntos, facilitando la comunicación y coordinación.",
      icon: "handshake",
    },
    {
      id: "3",
      title: "Simplicidad con Poder",
      description:
        "Interfaces intuitivas que no sacrifican funcionalidad. Lo complejo se vuelve simple, pero lo potente permanece.",
      icon: "wand-magic-sparkles",
    },
    {
      id: "4",
      title: "Transparencia Total",
      description:
        "Sin sorpresas, sin letra pequeña. Somos claros con nuestros precios, políticas y el uso de tus datos.",
      icon: "lock",
    },
  ];

  const stats: Stat[] = [
    { label: "Usuarios Activos", value: "50K+", icon: "users" },
    { label: "Proyectos Creados", value: "250K+", icon: "folder" },
    { label: "Satisfacción", value: "98%", icon: "star" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className={`relative ${getGradient()} text-font p-8 overflow-hidden rounded-2xl min-h-full flex items-center justify-center`}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center animate-slide-up">
            <div className="flex gap-4 items-center lg:text-start">
              <Logo className="hidden lg:block size-20 xl:size-30" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Construimos el Futuro
                <br />
                del Trabajo Colaborativo
              </h1>
            </div>

            <p className="text-lg lg:text-2xl text-font max-w-3xl leading-relaxed">
              Desde 2026, ayudamos a equipos a organizar proyectos, colaborar
              eficientemente y alcanzar sus objetivos más ambiciosos
            </p>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-14 xl:mt-20 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center float-element"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <FaIcon name={stat.icon} size="size-7" accent />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-font-light font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold text-font mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-font-light max-w-2xl mx-auto">
              Los principios que guían cada decisión, cada línea de código, cada
              interacción con nuestros usuarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.id}
                className="value-card flex gap-6 border-2 border-btn-border rounded-3xl p-6 shadow-xl hover:shadow-2xl animate-slide-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div
                  className={`shrink-0 ${getGradient()} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <FaIcon name={value.icon} size="size-9" accent />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="w-full text-2xl font-bold text-font">
                    {value.title}
                  </h3>
                  <p className="text-font-light text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-24 px-8 ${getGradient(2)}`}>
        <div className="max-w-5xl mx-auto text-center animate-slide-up text-font">
          <h2 className="text-5xl font-bold mb-8">Nuestra Misión</h2>
          <p className="text-2xl leading-relaxed mb-12">
            Empoderar a cada equipo del mundo para que transforme sus ideas en
            realidad, eliminando la complejidad innecesaria y amplificando la
            colaboración humana.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button className="px-8 py-4 bg-base text-main font-bold rounded-xl hover:shadow-2xl transition-all text-xl">
              Únete a nuestro equipo
            </button>
            <a
              href="mailto:vento-manager@gmail.com"
              className="px-10 py-5 bg-main text-base font-bold rounded-xl transition-all text-xl"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold text-font mb-4">Forma de Uso</h2>
            <p className="text-xl text-font-light">
              Una ligera guía del empleo de la aplicación.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;

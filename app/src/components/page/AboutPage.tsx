import React from "react";
import FaIcon from "../atom/FaIcon";

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

const AboutPage: React.FC = () => {
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
      icon: "eye",
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
      <section className="relative bg-linear-to-br from-main to-blue-300  dark:from-purple-600 dark:via-indigo-600 dark:to-blue-700 text-font py-32 px-8 overflow-hidden rounded-lg min-h-full">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center animate-slide-up">
            <h1 className="text-7xl font-bold mb-6 leading-tight">
              Construimos el Futuro
              <br />
              del Trabajo Colaborativo
            </h1>
            <p className="text-2xl text-font max-w-3xl mx-auto leading-relaxed">
              Ayudamos a equipos de todo el mundo a organizar proyectos,
              colaborar eficientemente y alcanzar sus objetivos más ambiciosos
            </p>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20 animate-fade-in"
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
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
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
                className="value-card border-2 border-btn-border rounded-3xl p-10 shadow-xl hover:shadow-2xl animate-slide-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="bg-linear-to-br from-purple-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaIcon name={value.icon} size="size-9" accent />
                </div>
                <h3 className="text-2xl font-bold text-font mb-4">
                  {value.title}
                </h3>
                <p className="text-font-light text-lg leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-8 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto text-center animate-slide-up">
          <h2 className="text-5xl font-bold mb-8">Nuestra Misión</h2>
          <p className="text-2xl text-purple-100 leading-relaxed mb-12">
            Empoderar a cada equipo del mundo para que transforme sus ideas en
            realidad, eliminando la complejidad innecesaria y amplificando la
            colaboración humana.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button className="px-8 py-4 bg-base text-main font-bold rounded-xl hover:shadow-2xl transition-all text-xl">
              Únete a nuestro equipo
            </button>
            <button className="px-10 py-5 bg-main text-base font-bold rounded-xl transition-all text-xl">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

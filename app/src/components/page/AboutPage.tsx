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
      <style>{`
        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .value-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .value-card:hover {
          transform: translateY(-12px) rotate(2deg);
        }
        .team-card {
          transition: all 0.3s ease;
        }
        .team-card:hover {
          transform: scale(1.05);
        }
        .float-element {
          animation: floatAnimation 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-600 via-indigo-600 to-blue-700 text-font py-32 px-8 overflow-hidden rounded-lg min-h-full">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center animate-slide-up">
            <h1 className="text-7xl font-bold mb-6 leading-tight">
              Construimos el Futuro
              <br />
              del Trabajo Colaborativo
            </h1>
            <p className="text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Desde 2020, ayudamos a equipos de todo el mundo a organizar
              proyectos, colaborar eficientemente y alcanzar sus objetivos más
              ambiciosos
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
                  <FaIcon name={stat.icon} size="size-7" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-purple-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h2 className="text-5xl font-bold text-font mb-8 text-center">
              Nuestra Historia
            </h2>
            <div className="space-y-6 text-lg text-font-light leading-relaxed">
              <p>
                Todo comenzó con una frustración compartida. María y Carlos,
                nuestros fundadores, trabajaban en diferentes startups pero
                enfrentaban el mismo problema:{" "}
                <strong className="text-font">
                  las herramientas de gestión de proyectos eran demasiado
                  complejas o demasiado simples
                </strong>
                . Nada parecía encontrar el balance perfecto.
              </p>
              <p>
                Durante una conferencia tecnológica en Barcelona en 2020, se
                conocieron y descubrieron que compartían esta visión. ¿Por qué
                no crear algo diferente? Una plataforma que fuera{" "}
                <strong className="text-font">
                  potente sin ser abrumadora, intuitiva sin ser limitada
                </strong>
                .
              </p>
              <p>
                Seis meses después, lanzamos nuestra primera beta con 100
                usuarios. Sus comentarios fueron invaluables. Cada función que
                agregamos, cada interfaz que diseñamos, fue moldeada por
                conversaciones reales con equipos reales enfrentando desafíos
                reales.
              </p>
              <p className="text-xl font-semibold text-font border-l-4 border-main pl-6 py-2 bg-btn rounded">
                Hoy, más de 50,000 usuarios en 45 países confían en nosotros
                para gestionar sus proyectos más importantes. Y apenas estamos
                comenzando.
              </p>
            </div>
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
                  <FaIcon name={value.icon} size="size-9" />
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

import type { link } from "../../types/link.ts";
import FaIcon from "../atom/FaIcon.tsx";
import TechIcon from "../atom/TechIcon.tsx";

export default function Footer() {
  const techStack: link[] = [
    { name: "React", href: "https://es.react.dev/" },
    { name: "TypeScript", href: "https://www.typescriptlang.org/" },
    { name: "Vite", href: "https://vite.dev" },
    { name: "TailwindCSS", href: "https://tailwindcss.com/" },
    { name: "Vercel", href: "https://vercel.com/" },
  ];
  const contacts: link[] = [
    {
      icon: "envelope",
      name: "Email",
      href: "mailto:maldonado.ignacio.pablo@gmail.com",
    },
    {
      icon: "github-square",
      name: "Github",
      href: "https://github.com/McMaldo",
    },
    {
      icon: "linkedin-square",
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/pablo-ignacio-maldonado",
    },
    { icon: "devto-square", name: "DevTo", href: "https://dev.to/mcmaldo" },
    {
      icon: "gitlab-square",
      name: "Gitlab",
      href: "https://gitlab.com/maldonado.ignacio.pablo",
    },
  ];

  const license: string[] = ["-by", "-nc", "-sa"];

  return (
    <footer className="flex w-[calc(100%-2rem)] flex-col gap-4 rounded-2xl border border-btn-border bg-base p-4 lg:p-6 m-4">
      <section className="flex h-full flex-wrap gap-4 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        <article className="flex min-h-full flex-col justify-between">
          <a
            href="https://mcmaldo.vercel.app"
            target="_blank"
            title="Ir a mi Portfolio"
          >
            <h2 className="h-10 text-4xl">McMaldo</h2>
            <h3 className="text-main text-lg font-light">Web Developer</h3>
          </a>
          <div>
            <h3 className="text-xl text-icon">Tecnologías</h3>
            <div className="flex gap-4 pt-1">
              {techStack.map(({ name, href }, index) => (
                <a href={href} title={name} className="group" key={index}>
                  <TechIcon name={name} />
                </a>
              ))}
            </div>
          </div>
        </article>
        <article className="flex min-h-full xl:justify-center">
          <div>
            <h3 className="text-xl text-icon">Contactos</h3>
            <div className="flex flex-col gap-2 pt-1 pl-2">
              {contacts.map(({ icon, href, name }, index) => (
                <a
                  href={href}
                  className="flex items-center gap-2 hover:underline"
                  target="_blank"
                  key={index}
                >
                  <FaIcon name={icon} size="size-6" />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </article>
        <article className="flex min-h-full xl:justify-center">
          <div>
            <h3 className="text-xl text-icon">Acerca del Proyecto</h3>
            <div className="flex flex-col gap-2 pt-1 pl-2">
              <p className="indent-4">
                Mantiene un seguimiento preciso de las piezas de un proyecto
                industrial, ya sea en procesos como en ubicación espacial.
              </p>
              <p className="indent-4">
                Permite administrar los distintos procesos por los que debe
                pasar una pieza hasta su finalización y entrega.
              </p>
            </div>
          </div>
        </article>
      </section>
      <section className="flex justify-between rounded-xl border border-btn-border bg-bg p-2.5 pb-0 text-lg text-icon">
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          className="flex gap-1"
        >
          <svg className="inline-block size-8 select-none">
            <use xlinkHref="/icon/faLicense.svg#creative-commons"></use>
          </svg>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {license.map((cc, index) => (
                <svg className="inline-block size-5 select-none" key={index}>
                  <use
                    xlinkHref={`/icon/faLicense.svg#creative-commons${cc}`}
                  ></use>
                </svg>
              ))}
            </div>
            <span className="w-fill rounded-t-lg bg-main text-center text-xs text-base">
              License
            </span>
          </div>
        </a>
        <h3>Bs As | Arg</h3>
      </section>
    </footer>
  );
}

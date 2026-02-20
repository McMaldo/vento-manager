import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="size-full grid place-items-center">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-9xl text-main">404</span>
        <div className="flex flex-col items-center">
          <span className="text-xl">Ha ocurrido un Error,</span>
          <span className="text-xl">la página no existe</span>
        </div>
        <Link
          to="/inicio"
          className="bg-main text-base rounded-sm px-6 py-2 text-2xl font-medium mt-4"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

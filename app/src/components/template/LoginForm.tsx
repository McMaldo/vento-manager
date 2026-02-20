import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../atom/Logo";
import ExpandMessage from "../atom/ExpandMessage";
import FormInput from "../molecule/FormInput";

// Configuración global recomendada (idealmente en un archivo axios.ts separado)
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://tu-api.com";

interface LoginProps {
  formOpened: string;
  setFormOpened: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginProps> = ({ formOpened, setFormOpened }) => {
  const navigate = useNavigate();

  const repeatPassword = useRef<HTMLDivElement>(null);
  const [repeatPasswordHeight, setRepeatPasswordHeight] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isExtended = formOpened === "login" || formOpened === "register";

  useEffect(() => {
    if (repeatPassword.current) {
      setRepeatPasswordHeight(repeatPassword.current.scrollHeight);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formOpened === "register" && password !== repeatPass) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Bypass de admin — credenciales desde .env (prefijo VITE_ requerido)
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
    const demoPass = import.meta.env.VITE_DEMO_PASS;

    if (email === demoEmail && password === demoPass) {
      navigate("/inicio");
      return;
    }

    setLoading(true);

    try {
      const endpoint = formOpened === "login" ? "/api/login" : "/api/register";
      await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true },
      );
      navigate("/inicio");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Ocurrió un error. Intentá de nuevo.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className={`[grid-area:login] z-11 ${
        isExtended ? "w-full sm:w-80 p-4 opacity-100" : "w-0 opacity-0"
      } flex flex-col items-center gap-4 pr-0 h-full justify-center transition-all`}
    >
      <Logo className="mb-6 size-20" color="icon" />

      {/* Toggle Login / Register */}
      <div className="relative w-full flex text-lg">
        <div
          className={`absolute h-full w-1/2 bg-icon transition-all rounded-lg ${
            formOpened === "login" ? "left-0" : "left-1/2"
          }`}
        />
        <button
          onClick={() => {
            setFormOpened("login");
            setError(null);
          }}
          className={`z-1 flex-1 h-full grid place-items-center py-1 font-bold transition-colors ${
            formOpened === "login" ? "text-mantle" : "text-icon"
          }`}
        >
          Ingresar
        </button>
        <button
          onClick={() => {
            setFormOpened("register");
            setError(null);
          }}
          className={`z-1 flex-1 h-full grid place-items-center py-1 font-bold transition-colors ${
            formOpened === "register" ? "text-mantle" : "text-icon"
          }`}
        >
          Registrarme
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          index={1}
          placeHolder="Ingresar Email"
          onChange={setEmail}
        />
        <FormInput
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          index={2}
          placeHolder="Ingresar Contraseña"
          onChange={setPassword}
        />
        {/* Repetir contraseña — solo en registro */}
        <div
          className="transition-all ease overflow-hidden"
          style={{
            height: formOpened === "register" ? repeatPasswordHeight : 0,
          }}
        >
          <div className="flex flex-col" ref={repeatPassword}>
            <FormInput
              label="Repetir Contraseña"
              type="password"
              name="repeatPassword"
              value={repeatPass}
              index={3}
              placeHolder="Repetir Contraseña"
              required={formOpened === "register"}
              onChange={setRepeatPass}
            />
          </div>
        </div>
        <ExpandMessage
          message="Olvidaste tu Contraseña?"
          className="text-main hover:underline cursor-pointer"
          isOpened={formOpened === "login"}
        />
        <ExpandMessage
          message={error}
          className="text-red-400"
          isOpened={error !== undefined || error !== null}
        />
        <input
          type="submit"
          value={
            loading
              ? "Cargando..."
              : formOpened === "login"
                ? "Ingresar"
                : "Registrarme"
          }
          disabled={loading}
          className="w-full px-4 py-2 outline-none text-lg mt-6 rounded-md bg-main transition-colors cursor-pointer text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </form>
    </article>
  );
};

export default LoginForm;

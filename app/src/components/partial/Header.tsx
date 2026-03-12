import type React from "react";
import Logo from "../atom/Logo";

interface HeaderProps {
  variant?: string;
  setFormOpened?: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ variant, setFormOpened }) => {
  return (
    <header
      className={`[grid-area:header] w-full px-4 pt-0 bg-base flex justify-between ${variant == "landing" ? "pb-2 landing" : "pb-4"}`}
    >
      <Logo imagotype className="h-full select-none" />
      {variant == "landing" && setFormOpened && (
        <div className="flex gap-2 h-full text-lg">
          <button
            onClick={() => setFormOpened("login")}
            className="h-full grid place-items-center px-5 bg-icon hover:bg-font text-mantle rounded-lg font-bold transition-colors"
          >
            Ingresar
          </button>
          <button
            onClick={() => setFormOpened("register")}
            className="hidden sm:grid h-full place-items-center px-5 bg-main hover:bg-font text-mantle rounded-lg font-bold transition-colors"
          >
            Registrarme
          </button>
        </div>
      )}
    </header>
  );
};
export default Header;

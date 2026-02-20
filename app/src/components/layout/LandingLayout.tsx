import { Outlet } from "react-router-dom";
import Header from "../partial/Header";
import React, { useState } from "react";
import LoginForm from "../template/LoginForm";
import Overlay from "../template/Overlay";

const LandingLayout: React.FC = () => {
  const [formOpened, setFormOpened] = useState<string>("");
  const isFormOpened = formOpened == "login" || formOpened == "register";

  return (
    <div className="h-dvh grid [grid-template-areas:'header_header''main_login'] grid-cols-[minmax(0,1fr)_auto] grid-rows-[3rem_calc(100dvh-3rem)] relative">
      <Header
        variant={isFormOpened ? "" : "landing"}
        setFormOpened={setFormOpened}
      />
      <main className="[grid-area:main] pb-8">
        <div
          className={`flex flex-col gap-4 size-full bg-mantle rounded-2xl ${isFormOpened ? "relative overflow-hidden" : "overflow-x-hidden overflow-y-scroll custom-scroll"}`}
        >
          <Outlet />
          <div
            onClick={() => setFormOpened("")}
            className={`z-11 fixed right-0 top-0 transition-colors ${isFormOpened ? "size-full bg-black/30" : "bg-transparent"}`}
          ></div>
        </div>
      </main>
      <LoginForm formOpened={formOpened} setFormOpened={setFormOpened} />
      <Overlay />
    </div>
  );
};
export default LandingLayout;

import { Outlet } from "react-router-dom";
import Header from "../partial/Header";
import Aside from "../partial/Aside";

export default function MainLayout() {
  return (
    <>
      <div className="h-dvh grid [grid-template-areas:'header_header''main_aside'] grid-cols-[minmax(0,1fr)_auto] grid-rows-[3rem_calc(100dvh-3rem)]">
        <Header />
        <main className="[grid-area:main] pb-8">
          <div className="flex flex-col custom-scroll size-full bg-mantle rounded-2xl border border-btn-border p-4 overflow-y-scroll overflow-x-hidden">
            <Outlet />
          </div>
        </main>
        <Aside />
      </div>
    </>
  );
}

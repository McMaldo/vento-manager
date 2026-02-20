import { Outlet } from "react-router-dom";
import Header from "../partial/Header";
import Aside from "../partial/Aside";

export default function MainLayout() {
  return (
    <>
      <div className="h-dvh grid [grid-template-areas:'header''main''aside'] grid-cols-1 grid-rows-[3rem_calc(100dvh-7.75rem)_auto] md:[grid-template-areas:'header_header''main_aside'] md:grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[3rem_calc(100dvh-3rem)]">
        <Header />
        <main className="[grid-area:main] md:pb-8">
          <div className="flex flex-col custom-scroll size-full bg-mantle rounded-2xl border border-btn-border p-4 overflow-y-scroll overflow-x-hidden">
            <Outlet />
          </div>
        </main>
        <Aside />
      </div>
    </>
  );
}

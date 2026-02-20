import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Layouts
import LandingLayout from "./components/layout/LandingLayout.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";

// Components
import Loading from "./components/atom/Loading.tsx";

// Pages
import ErrorPage from "./components/page/ErrorPage.tsx";
const LandingPage = lazy(() => import("./components/page/LandingPage.tsx"));
const MainPage = lazy(() => import("./components/page/MainPage.tsx"));
const ProjectsPage = lazy(() => import("./components/page/ProjectsPage.tsx"));
const TeamsPage = lazy(() => import("./components/page/TeamsPage.tsx"));
const SettingsPage = lazy(() => import("./components/page/SettingsPage.tsx"));
const HelpPage = lazy(() => import("./components/page/HelpPage.tsx"));
const AboutPage = lazy(() => import("./components/page/AboutPage.tsx"));
const ProjectPage = lazy(() => import("./components/page/ProjectPage.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/landing" element={<LandingLayout />}>
        <Route
          path="/landing"
          element={
            <Suspense fallback={<Loading />}>
              <LandingPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/inicio"
          element={
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/proyectos"
          element={
            <Suspense fallback={<Loading />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="/proyecto/:projectId"
          element={
            <Suspense fallback={<Loading />}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path="/equipos"
          element={
            <Suspense fallback={<Loading />}>
              <TeamsPage />
            </Suspense>
          }
        />
        <Route
          path="/ajustes"
          element={<Navigate to="/ajustes/cuenta" replace />}
        />
        <Route
          path="/ajustes/:section"
          element={
            <Suspense fallback={<Loading />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="/ayuda"
          element={
            <Suspense fallback={<Loading />}>
              <HelpPage />
            </Suspense>
          }
        />
        <Route
          path="/acerca"
          element={
            <Suspense fallback={<Loading />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>,
);

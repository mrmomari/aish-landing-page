import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminApp from "./admin/AdminApp";

const isAdminRoute =
  new URLSearchParams(window.location.search).get("admin") === "1" ||
  window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isAdminRoute ? <AdminApp /> : <App />}</StrictMode>
);

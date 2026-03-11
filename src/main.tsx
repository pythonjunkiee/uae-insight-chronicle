import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { stripConsoleLogs } from "./lib/security";
import ErrorBoundary from "./components/ErrorBoundary";

// Strip console output in production to prevent data leakage
stripConsoleLogs();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

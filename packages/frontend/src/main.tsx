import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AppProvider } from "./context/app_context/AppContext.tsx";
import { XerProvider } from "./context/xer_context/XerContext.tsx";

import "./index.css";
import { ThemeProvider } from "./context/theme_context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <XerProvider>
            <App />
          </XerProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes/route.tsx";

import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "sonner";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="inkwell-theme">
        <Provider store={store}>
          <RouterProvider router={routes} />
          <Toaster position="bottom-center" />
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

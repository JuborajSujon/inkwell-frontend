import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes/route.tsx";

import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
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
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={routes} />
            <Toaster position="bottom-center" />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

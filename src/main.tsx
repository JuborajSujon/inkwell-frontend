import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/route.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

import Main from "@/layout/Main";
import About from "@/pages/AboutUs/About";
import AllProduct from "@/pages/AllProduct/AllProduct";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/HomePage/Home";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProduct />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/Dashboard",
    element: <div>Dashboard</div>,
  },
]);

export default routes;

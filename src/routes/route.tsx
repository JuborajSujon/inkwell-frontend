import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;

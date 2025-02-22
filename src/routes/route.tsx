import Main from "@/layout/Main";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/HomePage/Home";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;

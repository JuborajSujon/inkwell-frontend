import Main from "@/layout/Main";
import About from "@/pages/AboutUs/About";
import AllProduct from "@/pages/AllProduct/AllProduct";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/HomePage/Home";
import ProductDetails from "@/pages/ProductDetails/ProductDetails";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/layout/Dashboard";
import AdminRoute from "./AdminRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

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
        element: <ProductDetails />,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <div>Checkout</div>
          </PrivateRoute>
        ),
      },

      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <div>Payment</div>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/Dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>Dashboard Home</div>,
      },
      {
        path: "/Dashboard/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/Dashboard/products",
        element: <div>Products</div>,
      },
      {
        path: "/Dashboard/users",
        element: <div>Users</div>,
      },
      {
        path: "/Dashboard/reviews",
        element: <div>Reviews</div>,
      },
      {
        path: "/Dashboard/add-product",
        element: <div>Add Product</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default routes;

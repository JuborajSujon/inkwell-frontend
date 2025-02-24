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
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>Dashboard Home</div>,
      },
      {
        path: "/Dashboard/orders",
        element: (
          <AdminRoute>
            <div>Orders</div>
          </AdminRoute>
        ),
      },
      {
        path: "/Dashboard/products",
        element: (
          <AdminRoute>
            <div>Products</div>
          </AdminRoute>
        ),
      },
      {
        path: "/Dashboard/users",
        element: (
          <AdminRoute>
            <div>Users</div>
          </AdminRoute>
        ),
      },
      {
        path: "/Dashboard/reviews",
        element: (
          <AdminRoute>
            <div>Reviews</div>
          </AdminRoute>
        ),
      },
      {
        path: "/Dashboard/add-product",
        element: (
          <AdminRoute>
            <div>Add Product</div>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routes;

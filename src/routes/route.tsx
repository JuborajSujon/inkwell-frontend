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
import CreateProduct from "@/pages/Dashboard/AdminPages/CreateProduct";
import ProductList from "@/pages/Dashboard/AdminPages/ProductList";
import UserList from "@/pages/Dashboard/AdminPages/UserList";
import UserProfilePage from "@/pages/Dashboard/UserProfile";

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
    path: "/dashboard",
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
        path: "/dashboard/product/create-product",
        element: (
          <AdminRoute role="admin">
            <CreateProduct />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/product/product-list",
        element: (
          <AdminRoute role="admin">
            <ProductList />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/user/user-list",
        element: (
          <AdminRoute role="admin">
            <UserList />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/user/my-profile",
        element: (
          <AdminRoute role="admin">
            <UserProfilePage />
          </AdminRoute>
        ),
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

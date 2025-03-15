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
import ChangePassword from "@/pages/Dashboard/ChangePassword";
import CartPage from "@/pages/Dashboard/CartPage";
import CheckoutPage from "@/pages/Dashboard/Checkout";
import VerifyOrder from "@/pages/Dashboard/VerifyOrder";
import OrderDetails from "@/pages/Dashboard/OrderDetails";
import DashboardHome from "@/pages/Dashboard/AdminPages/DashboardHome";
import OrderList from "@/pages/Dashboard/AdminPages/OrderList";

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
        element: <DashboardHome />,
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
        element: <UserProfilePage />,
      },
      {
        path: "/dashboard/user/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/dashboard/carts/my-cart-list",
        element: <CartPage />,
      },
      {
        path: "/dashboard/orders/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/dashboard/orders/verify-order",
        element: <VerifyOrder />,
      },
      {
        path: "/dashboard/orders/order-details",
        element: <OrderDetails />,
      },
      {
        path: "/dashboard/orders/update-order",
        element: (
          <AdminRoute role="admin">
            <OrderList />
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

import useLogout from "@/hooks/use-logout";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { IPrivateRoute, IUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children, role }: IPrivateRoute) => {
  const token = useSelector(useCurrentToken);
  const logout = useLogout();

  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }

  const user: IUser | null = verifyToken(token) as IUser;

  if (!user || user?.role !== role) {
    logout();

    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }

  return <main>{children}</main>;
};

export default AdminRoute;

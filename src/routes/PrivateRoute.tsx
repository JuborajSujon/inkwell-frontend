import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }

  return <main>{children}</main>;
};

export default PrivateRoute;

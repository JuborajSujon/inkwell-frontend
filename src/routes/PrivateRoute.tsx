import Spinner from "@/components/spinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoading = false;
  const isAuthenticated = true;

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }

  return <main>{children}</main>;
};

export default PrivateRoute;

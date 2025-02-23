import Spinner from "@/components/spinner";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoading = false;
  const isAuthenticated = true;
  const isAdminLoading = false;
  const isAdmin = true;

  const location = useLocation();

  if (isLoading || isAdminLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size={"lg"} />
      </div>
    );

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }

  return <main>{children}</main>;
};

export default AdminRoute;

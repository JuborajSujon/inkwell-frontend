import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import UserDashboard from "../UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const user = useAppSelector(useCurrentUser);

  if (user?.role === "user") {
    return <UserDashboard />;
  }

  return <AdminDashboard />;
};

export default DashboardHome;

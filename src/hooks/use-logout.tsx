import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import Cookies from "js-cookie";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch(logout());
    navigate("/");
    toast("log out successful");
  };

  return handleLogout;
};

export default useLogout;

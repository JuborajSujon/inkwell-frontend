import Navbar from "@/pages/Components/Navbar";
import Footer from "@/pages/Footer/Footer";
import { LoginDialog } from "@/pages/LoginDialog";
import { RegisterDialog } from "@/pages/RegisterDialog";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="h-full  bg-background font-poppins">
      <Navbar />
      <LoginDialog />
      <RegisterDialog />
      <div className="pt-24 px-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

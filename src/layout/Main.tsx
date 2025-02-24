import Navbar from "@/pages/Components/Navbar";
import Footer from "@/pages/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="h-full  bg-background font-poppins">
      <Navbar />

      <div className="pt-[70px] px-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

import Navbar from "@/pages/Components/Navbar";
import Footer from "@/pages/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="h-full dark:bg-[#1F1F1F] bg-background font-poppins">
      <Navbar />
      <div className="pt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

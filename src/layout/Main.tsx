import Footer from "@/pages/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="h-full dark:bg-[#1F1F1F] bg-background">
      <h1>Navbar</h1>
      <Outlet />

      <Footer />
    </div>
  );
}

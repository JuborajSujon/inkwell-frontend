import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/pages/Dashboard/Sidebar";
import DashboardNav from "@/pages/Dashboard/DashboardNav";

const Dashboard = () => {
  const [isActive, setActive] = useState(false);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className="h-screen flex max-w-[1540px] mx-auto font-poppins">
      {/* sider bar */}
      <div className="relative">
        <Sidebar handleToggle={handleToggle} isActive={isActive} />
      </div>

      {/* dashboard dynamic content */}
      <div className="flex flex-col flex-grow overflow-hidden ">
        {/* navbar */}
        <DashboardNav handleToggle={handleToggle} isActive={isActive} />
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

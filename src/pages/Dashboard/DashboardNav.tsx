import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { MenuIcon } from "lucide-react";
import { UserProfileDashboard } from "@/components/modal/user-profile-dashboard";
import { ModeToggle } from "@/components/mode-toggle";

interface DashboardNavProps {
  handleToggle: () => void;
  isActive?: boolean;
}

const DashboardNav = ({ handleToggle }: DashboardNavProps) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-10 w-full bg-slate-50 dark:bg-black  border-b border-gray-200">
      {/* Small Screen Navbar */}
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Humburger and Logo */}
        <div className="hidden md:block"></div>
        <div className="flex items-center md:hidden">
          <button
            onClick={handleToggle}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200">
            <MenuIcon className="h-5 w-5 dark:text-slate-300" />
          </button>
          <div className="block cursor-pointer font-bold">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-x-2">
              <img src={logo} alt="logo" className="w-6 md:hidden" />{" "}
              <span className="text-lg font-semibold md:hidden">Inkwell</span>
            </Link>
          </div>
        </div>

        {/* Navbar */}
        {/* Right Side */}
        <div className="flex items-center space-x-3">
          <UserProfileDashboard />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;

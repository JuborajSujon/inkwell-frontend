import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Home, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  handleToggle: () => void;
  isActive: boolean;
}

const Sidebar = ({ handleToggle, isActive }: SidebarProps) => {
  const userData = {
    name: "Mr. One",
    email: "support@yinkwellstore.com",
    role: "admin",
  };

  // Logout Handler
  const handleLogout = async () => {};
  return (
    <>
      {/* Sidebar */}

      <div
        className={`md:flex flex-col bg-background  justify-between overflow-x-hidden border-r space-y-6 px-2 py-3 z-20 min-h-screen w-64 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } transform md:translate-x-0 md:static fixed top-0 left-0 h-full transition-transform duration-200 ease-in-out`}>
        <div>
          <div className="flex justify-between border-b border-gray-200  pb-4">
            <div className="">
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-x-2">
                <img src={logo} alt="logo" className="w-6 " />{" "}
                <span className="text-lg font-semibold ">Inkwell</span>
              </Link>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggle}
              className=" md:hidden">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1">
            {/*  Menu Items */}
            <nav className="mt-4 space-y-1 ">
              {userData?.role === "admin" ? (
                <>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-1.5 rounded-sm transition-colors duration-200 hover:bg-muted ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`
                    }>
                    <Home className="w-5 h-5" />
                    <span className="ml-3 text-sm">Dashboard Home</span>
                  </NavLink>
                  <NavLink
                    to="admin-profile"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-1.5 rounded-sm transition-colors duration-200 hover:bg-muted ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`
                    }>
                    <User className="w-5 h-5" />
                    <span className="ml-3 text-sm">Admin Profile</span>
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="user-profile"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-1.5 rounded-sm transition-colors duration-200 hover:bg-muted ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`
                  }>
                  <User className="w-5 h-5" />
                  <span className="ml-3 text-sm">My Profile</span>
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

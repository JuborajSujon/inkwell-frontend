import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const isLoading = false;
  const isAuthenticated = false;
  const scrolled = useScrollTop();

  const navList = (
    <>
      <li className="">
        <NavLink
          to="/"
          end
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "px-4 -mb-1 border-b-2 border-transparent text-nowrap"
              : "text-amber-600 border-amber-600"
          }>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-products"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "px-4 -mb-1 border-b-2 border-transparent text-nowrap"
              : "text-amber-600 border-amber-600"
          }>
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "px-4 -mb-1 border-b-2 border-transparent text-nowrap"
              : "text-amber-600 border-amber-600"
          }>
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={cn(
        "z-50 fixed top-0 max-w-[1540px] w-full bg-background dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}>
      <div className="flex items-center justify-between p-6">
        {/* Logo */}
        <div className="">
          <button className="p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <span className="hidden md:block">
            <Logo />
          </span>
        </div>
        {/* Links */}
        <div className="flex-1 flex items-center justify-center">
          <ul className="items-center hidden space-x-3 md:flex">{navList}</ul>
        </div>
        {/* Actions */}
        <div className="justify-end flex items-center gap-x-2 ">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <Button variant={"ghost"} size={"sm"}>
                Log in
              </Button>
              <Button size={"sm"}>Register</Button>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant={"ghost"} size={"sm"}>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <h1>User Profile</h1>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

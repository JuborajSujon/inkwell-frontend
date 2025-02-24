import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { UserProfile } from "@/components/modal/user-profile";

import { UseNavbarMenu } from "@/components/modal/use-navbar-menu";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";

export default function Navbar() {
  const user = useAppSelector(useCurrentUser);
  const [isLoading, setIsLoading] = useState(false);

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
              ? "text-amber-600 border-amber-600 px-4 -mb-1 border-b-2 border-transparent"
              : "px-4 -mb-1 border-b-2 border-transparent"
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
              ? "text-amber-600 border-amber-600 px-4 -mb-1 border-b-2 border-transparent"
              : "px-4 -mb-1 border-b-2 border-transparent"
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
              ? "text-amber-600 border-amber-600 px-4 -mb-1 border-b-2 border-transparent"
              : "px-4 -mb-1 border-b-2 border-transparent"
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
          <UseNavbarMenu />
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
          {!user && !isLoading && (
            <>
              <Link to="/login">
                <Button variant={"ghost"} size={"sm"}>
                  Log in
                </Button>
              </Link>

              <Link to="/register">
                <Button size={"sm"}>Register</Button>
              </Link>
            </>
          )}
          {user && !isLoading && (
            <>
              <UserProfile />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

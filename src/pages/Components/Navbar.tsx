import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useLogin } from "@/hooks/use-login";
import { useRegister } from "@/hooks/use-register";
import { UserProfile } from "@/components/modal/user-profile";

import { UseNavbarMenu } from "@/components/modal/use-navbar-menu";

export default function Navbar() {
  const isLoading = false;
  const isAuthenticated = false;
  const scrolled = useScrollTop();
  const { onOpen: openLogin } = useLogin();
  const { onOpen: openRegister } = useRegister();

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
          {!isAuthenticated && !isLoading && (
            <>
              <Button onClick={openLogin} variant={"ghost"} size={"sm"}>
                Log in
              </Button>

              <Button onClick={openRegister} size={"sm"}>
                Register
              </Button>
            </>
          )}
          {isAuthenticated && !isLoading && (
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

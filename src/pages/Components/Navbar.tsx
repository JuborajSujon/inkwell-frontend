import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { UserProfile } from "@/components/modal/user-profile";

import { UseNavbarMenu } from "@/components/modal/use-navbar-menu";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/auth/authApi";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetAllCartQuery } from "@/redux/features/cart/cartApi";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);

  const { data: userData, isLoading } = useGetSingleUserQuery(user?.email, {
    skip: !user?.email, // Skip query if user is not logged in
  });

  // Fetch cart data
  const { data: carts } = useGetAllCartQuery(undefined);

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
      <div className="flex items-center justify-between p-3">
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
          <Button
            onClick={() => {
              navigate("/dashboard/carts/my-cart-list");
            }}
            variant="link"
            className="relative">
            <ShoppingCart className="h-6 w-6" />
            <Badge className="absolute right-0 top-0 bg-red-600 text-white rounded-full text-xs p-1">
              {carts?.data?.items?.length || 0}
            </Badge>
          </Button>
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
              <UserProfile user={userData} />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  ChefHat,
  CreditCard,
  Edit,
  Home,
  Key,
  List,
  ShoppingCart,
  User,
  UserCog,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface SidebarProps {
  handleToggle: () => void;
  isActive: boolean;
}

const Sidebar = ({ handleToggle, isActive }: SidebarProps) => {
  const userData = useAppSelector(useCurrentUser);

  // Admin menu list
  const adminMenuList = [
    {
      group: "General",
      items: [
        {
          link: "/dashboard",
          icon: <Home className="w-5 h-5" />,
          text: "Dashboard",
        },
      ],
    },
    {
      group: "User Management",
      items: [
        {
          link: "/dashboard/user/user-list",
          icon: <User className="w-5 h-5" />,
          text: "Users Profile",
        },
        {
          link: "/dashboard/user/my-profile",
          icon: <UserCog className="w-5 h-5" />,
          text: "My Profile",
        },
        {
          link: "/dashboard/user/change-password",
          icon: <Key className="w-5 h-5" />,
          text: "Change Password",
        },
      ],
    },
    {
      group: "Product Management",
      items: [
        {
          link: "/dashboard/product/create-product",
          icon: <Edit className="w-5 h-5" />,
          text: "Create Product",
        },
        {
          link: "/dashboard/product/product-list",
          icon: <List className="w-5 h-5" />,
          text: "Product List",
        },
      ],
    },
    {
      group: "Cart Management",
      items: [
        {
          link: "/dashboard/carts/my-cart-list",
          icon: <ShoppingCart className="w-5 h-5" />,
          text: "My Cart",
        },
      ],
    },
    {
      group: "Orders Management",
      items: [
        {
          link: "/dashboard/orders/checkout",
          icon: <CreditCard className="w-5 h-5" />,
          text: "Checkout",
        },
        {
          link: "/dashboard/orders/order-details",
          icon: <List className="w-5 h-5" />,
          text: "My Orders History",
        },
        {
          link: "/dashboard/orders/update-order",
          icon: <ChefHat className="w-5 h-5" />,
          text: "Udpate Orders",
        },
      ],
    },
  ];

  // User menu list
  const userMenuList = [
    {
      group: "General",
      items: [
        {
          link: "/dashboard",
          icon: <Home className="w-5 h-5" />,
          text: "Dashboard",
        },
      ],
    },
    {
      group: "Profile Management",
      items: [
        {
          link: "/dashboard/user/my-profile",
          icon: <UserCog className="w-5 h-5" />,
          text: "My Profile",
        },
        {
          link: "/dashboard/user/change-password",
          icon: <Key className="w-5 h-5" />,
          text: "Change Password",
        },
      ],
    },
    {
      group: "Cart Management",
      items: [
        {
          link: "/dashboard/carts/my-cart-list",
          icon: <ShoppingCart className="w-5 h-5" />,
          text: "My Cart",
        },
      ],
    },
    {
      group: "Orders Management",
      items: [
        {
          link: "/dashboard/orders/checkout",
          icon: <CreditCard className="w-5 h-5" />,
          text: "Checkout",
        },
        {
          link: "/dashboard/orders/order-details",
          icon: <List className="w-5 h-5" />,
          text: "My Orders History",
        },
      ],
    },
  ];

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
                  <Command>
                    <CommandList className="min-h-[90vh]">
                      {adminMenuList?.map((menu, key: number) => (
                        <CommandGroup key={key} heading={menu.group}>
                          {menu?.items?.map((option, keyOption: number) => (
                            <NavLink
                              key={keyOption}
                              to={option.link}
                              end
                              className={({ isActive }) =>
                                `flex items-center px-4 py-1.5 rounded-sm transition-colors duration-200 hover:bg-muted ${
                                  isActive
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground"
                                }`
                              }>
                              {option.icon}
                              <span className="ml-3 text-sm">
                                {option.text}
                              </span>
                            </NavLink>
                          ))}
                          <CommandSeparator />
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </>
              ) : (
                <>
                  <Command>
                    <CommandList className="min-h-[90vh]">
                      {userMenuList?.map((menu, key: number) => (
                        <CommandGroup key={key} heading={menu.group}>
                          {menu?.items?.map((option, keyOption: number) => (
                            <NavLink
                              key={keyOption}
                              to={option.link}
                              end
                              className={({ isActive }) =>
                                `flex items-center px-4 py-1.5 rounded-sm transition-colors duration-200 hover:bg-muted ${
                                  isActive
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground"
                                }`
                              }>
                              {option.icon}
                              <span className="ml-3 text-sm">
                                {option.text}
                              </span>
                            </NavLink>
                          ))}
                          <CommandSeparator />
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

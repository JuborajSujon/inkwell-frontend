import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useLogout from "@/hooks/use-logout";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserProfile({ user }: any) {
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={
              user?.data?.photo
                ? user?.data?.photo
                : "https://github.com/shadcn.png"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user?.data && (
          <div>
            <p className="ml-2 text-smfont-semibold">
              Name: {user?.data?.name}
            </p>
            <p className="ml-2 text-smfont-semibold">
              Email: {user?.data?.email}
            </p>
            <p className="ml-2 text-smfont-semibold">
              Role: {user?.data?.role}
            </p>

            <hr className="my-2" />
          </div>
        )}

        <DropdownMenuItem
          onClick={() => {
            navigate("/dashboard");
          }}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

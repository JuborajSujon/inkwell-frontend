import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

export function UserProfileDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              navigate("/");
            }}>
            Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>My Cart</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>User Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            Profle Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

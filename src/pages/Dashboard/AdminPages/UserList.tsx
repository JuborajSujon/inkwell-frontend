import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Ban, CircleFadingArrowUp, Search } from "lucide-react";
import { toast } from "sonner";
import ReactPaginate from "react-paginate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Spinner from "@/components/spinner";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const limit = 10;

  // Fetch user
  const { data, isLoading, error } = useGetAllUsersQuery({
    searchTerm: searchTerm || "",
    page: currentPage || 1,
    limit: limit || 10,
  });

  const users = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Block user

  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // Handle delete
  const handleBlockUser = async (id: string) => {
    setSelectedUserId(id);
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    if (selectedUserId) {
      try {
        await blockUser({
          id: selectedUserId,
          userData: { isBlocked: true },
        }).unwrap();
        toast.success("User block successfully");
        setIsBlockModalOpen(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to block user");
      }
    }
  };

  const handleUpdateUnblock = async (id: string) => {
    try {
      await blockUser({
        id: id,
        userData: { isBlocked: false },
      }).unwrap();
      toast.success("User unblock successfully");
      setIsBlockModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to unblock user");
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  if (error) return <p>Error loading products</p>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Photo</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">IsBlock</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user: TUser) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                      <td className="py-3 px-4">
                        {user?.photo ? (
                          <Avatar>
                            <AvatarImage src={user?.photo} alt="@shadcn" />
                            <AvatarFallback>IMG</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        )}
                      </td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        {user.role === "admin" ? (
                          <span className="px-2 py-1 rounded text-xs text-nowrap">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs text-nowrap">
                            User
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs text-nowrap">
                          {user.status ? (
                            <span className="text-green-500">active</span>
                          ) : (
                            <span className="text-red-500">inactive</span>
                          )}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs text-nowrap">
                          {user.isBlocked ? "Blocked" : "Not Blocked"}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleBlockUser(user._id)}
                          disabled={isBlocking}>
                          <Ban size={16} />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleUpdateUnblock(user._id)}>
                          <CircleFadingArrowUp size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">No products found.</p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"flex list-none space-x-2"}
            pageClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            activeClassName={"bg-blue-500 text-white"}
            previousClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            nextClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </CardFooter>
      </Card>

      {/* Update Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              {isBlocking ? "Block User" : "Unblock User"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isBlocking
                ? "The product has been successfully deleted."
                : "Are you sure you want to delete this product?"}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-2 p-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <h2 className="text-xl font-semibold leading-tight tracking-wide">
              Are you sure you want to block this user?
            </h2>
            <p className="flex-1 text-gray-600 dark:text-gray-400">
              This action cannot be undone. This user will be blocked.
            </p>
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setIsBlockModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmBlock}
                className="bg-red-600 text-white">
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserList;

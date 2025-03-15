/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Search, Eye } from "lucide-react";
import ReactPaginate from "react-paginate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/spinner";
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";
import OrderUpdate from "./OrderUpdate";

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const limit = 10;

  // Fetch products
  const { data, isLoading, error } = useGetAllOrderQuery({
    searchTerm: searchTerm || "",
    page: currentPage || 1,
    limit: limit || 10,
  });

  const orders = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // Handle edit button click
  const handleEditClick = (order: any) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  if (error) return <p>Error loading orders</p>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {orders?.result.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">User Id</th>
                    <th className="py-3 px-4 text-left">Invoice</th>
                    <th className="py-3 px-4 text-left">Product QTY</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Payment</th>
                    <th className="py-3 px-4 text-left">Delivery</th>
                    <th className="py-3 px-4 text-left">Delivery Address</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.result.map((order: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                      <td className="py-3 px-4">{order?.userEmail}</td>
                      <td className="py-3 px-4">
                        {order?.productItems?.orderInvoice}
                      </td>
                      <td className="py-3 px-4">
                        {order?.productItems?.orderItems?.length}
                      </td>
                      <td className="py-3 px-4">
                        {order?.productItems?.totalPrice}
                      </td>
                      <td className="py-3 px-4">
                        {order?.productItems?.paymentStatus}
                      </td>
                      <td className="py-3 px-4">
                        {order?.productItems?.deliverystatus}
                      </td>
                      <td className="py-3 px-4 text-nowrap">
                        {order?.productItems?.shippingAddress}
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(order?.productItems)}>
                          <Eye size={16} className="" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">No orders found.</p>
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
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="w-full max-w-7xl mx-4">
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
            <DialogDescription className="sr-only">
              Edit the details of the product.
            </DialogDescription>
          </DialogHeader>
          <OrderUpdate order={selectedOrder} onClose={setIsUpdateModalOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderList;

import { OrderViewModal } from "@/components/modal/use-order-view";
import Spinner from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMyOrderQuery } from "@/redux/features/order/orderApi";
import { cn } from "./../../lib/utils";

export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  model: string;
  photo: string;
  price: number;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt: "2025-02-26T23:05:37.384Z";
  updatedAt: "2025-03-11T10:54:23.054Z";
}

export interface OrderItem {
  _id: string;
  price: number;
  productId: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductItem {
  _id: string;
  deliverryStatus: string;
  isDeleted: boolean;
  orderInvoice: string;
  orderItems: OrderItem[];
  orderTitle: string;
  paymentStatus: string;
  deliverystatus: string;
  shippingAddress: string;
  totalPrice: number;
  transaction: Transaction;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  userEmail: string;
  productItems: ProductItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function OrderDetails() {
  const { isLoading, data } = useGetMyOrderQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const orderData = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold ">Order List</h1>
      {orderData === undefined && (
        <div className="flex justify-center items-center">
          <p className="text-xl font-semibold text-gray-800">
            No orders found.
          </p>
        </div>
      )}
      {orderData?.map((order: Order) => (
        <div key={order._id}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <strong>User Email:</strong> {order.userEmail}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p>
                <strong>Grand Total Price:</strong> $
                {order.productItems
                  .reduce(
                    (acc: number, item: ProductItem) => acc + item.totalPrice,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          </CardContent>
          <div className="grid grid-cols-1 gap-3 p-2">
            {order?.productItems?.map((productItem: ProductItem) => (
              <Card key={productItem._id} className="p-4 border rounded-lg">
                <CardHeader>
                  <CardTitle>
                    {productItem.orderTitle} {productItem.orderInvoice}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Product Quantity: </strong>{" "}
                    {productItem.orderItems.length}
                  </p>

                  <p>
                    <strong>Total Price:</strong> $
                    {productItem.totalPrice.toFixed(2)}
                  </p>

                  <div className="flex gap-2">
                    <strong>Payment Status:</strong>
                    <Badge
                      className={cn(
                        productItem?.paymentStatus === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      )}>
                      {productItem?.paymentStatus}
                    </Badge>
                  </div>

                  <div className="flex gap-2 mt-1">
                    <strong>Delivery Status:</strong>
                    <Badge
                      className={cn(
                        productItem?.deliverystatus === "pending"
                          ? "bg-red-500"
                          : "bg-green-500"
                      )}>
                      {productItem?.deliverystatus}
                    </Badge>
                  </div>
                  <div>
                    <p>
                      <strong>Bank Transaction:</strong>{" "}
                      {productItem.transaction.bank_status}
                    </p>
                    <p>
                      <strong>Transaction Method:</strong>{" "}
                      {productItem.transaction.method}
                    </p>
                    <p>
                      <strong>Transaction Data:</strong>{" "}
                      {new Date(
                        productItem.transaction.date_time
                      ).toLocaleString()}
                    </p>
                    <p>
                      <strong>Shipping Address:</strong>{" "}
                      {productItem.shippingAddress}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <OrderViewModal products={productItem.orderItems} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

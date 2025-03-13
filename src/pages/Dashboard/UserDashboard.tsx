import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";
import { useGetMyOrderQuery } from "@/redux/features/order/orderApi";
import { ShoppingBag, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

export default function UserDashboard() {
  const { isLoading, data } = useGetMyOrderQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  interface Order {
    _id: string;
    createdAt: string;
    productItems: {
      _id: string;
      orderTitle: string;
      deliverystatus: string;
      totalPrice: number;
      paymentStatus: string;
      createdAt: string;
    }[];
  }

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (data?.data) {
      setOrders(data.data);
    }
  }, [data]);

  const totalOrders = orders[0]?.productItems.length;

  const pendingOrders = orders.reduce((acc, order) => {
    return (
      acc +
      (order.productItems?.filter((item) => item.deliverystatus === "pending")
        .length || 0)
    );
  }, 0);

  const deliveredOrders = orders.reduce((acc, order) => {
    return (
      acc +
      (order.productItems?.filter((item) => item.deliverystatus === "shipping")
        .length || 0)
    );
  }, 0);

  const totalSpent = orders.reduce((acc, order) => {
    return (
      acc +
      (order.productItems?.reduce((sum, item) => sum + item.totalPrice, 0) || 0)
    );
  }, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            <ShoppingBag size={24} /> {totalOrders}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            <Clock size={24} /> {pendingOrders}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Received Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            <CheckCircle size={24} /> {deliveredOrders}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-lg font-semibold">
            $ {totalSpent.toFixed(2)}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[400px]">
              <LineChart
                width={400}
                height={250}
                data={orders.map((order) => ({
                  date: new Date(order.createdAt).toLocaleDateString(),
                  total: order.productItems.length,
                }))}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Analysis</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[400px]">
              <BarChart
                width={400}
                height={250}
                data={orders.map((order) => ({
                  date: new Date(order.createdAt).toLocaleDateString(),
                  spent: order.productItems.reduce(
                    (sum, item) => sum + item.totalPrice,
                    0
                  ),
                }))}>
                <XAxis dataKey="date" />
                <YAxis />
                <Bar dataKey="spent" fill="#82ca9d" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <div className="my-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Delivery Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) =>
                  order?.productItems.slice(0, 5).map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.orderTitle}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{item.paymentStatus}</TableCell>
                      <TableCell>{item.deliverystatus}</TableCell>
                      <TableCell>
                        $
                        {order.productItems
                          .reduce((sum, item) => sum + item.totalPrice, 0)
                          .toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

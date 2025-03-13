import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Line } from "recharts";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  LineChart,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Orders", value: "1,250", icon: <ShoppingCart size={24} /> },
    { title: "Revenue", value: "$32,000", icon: <DollarSign size={24} /> },
    { title: "Active Users", value: "5,210", icon: <Users size={24} /> },
    { title: "Products Sold", value: "8,750", icon: <Package size={24} /> },
  ];

  const chartData = [
    { name: "Jan", sales: 4000, orders: 2400 },
    { name: "Feb", sales: 3000, orders: 2210 },
    { name: "Mar", sales: 2000, orders: 2290 },
    { name: "Apr", sales: 2780, orders: 2000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Section 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-lg flex items-center p-4">
            {stat.icon}
            <div className="ml-4">
              <CardTitle>{stat.title}</CardTitle>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Section 2: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#1234</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$250</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#5678</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>$120</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

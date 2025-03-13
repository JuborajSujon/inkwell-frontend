import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useSearchParams } from "react-router";
import Spinner from "@/components/spinner";
import { useVerifyOrderQuery } from "@/redux/features/order/orderApi";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData = data?.data?.[0];

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="icon" />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold text-gray-800">Order Verification</h1>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Order ID:</strong> {orderData?.order_id}
          </p>
          <p>
            <strong>Amount:</strong> {orderData?.currency}{" "}
            {orderData?.amount?.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {orderData?.bank_status}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(orderData?.date_time)?.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Method:</strong> {orderData?.method}
          </p>
          <p>
            <strong>Transaction ID:</strong> {orderData?.bank_trx_id}
          </p>
          <p>
            <strong>Invoice No:</strong> {orderData?.invoice_no}
          </p>
          <p>
            <strong>SP Code:</strong> {orderData?.sp_code}
          </p>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Name:</strong> {orderData?.name}
          </p>
          <p>
            <strong>Email:</strong> {orderData?.email}
          </p>
          <p>
            <strong>Phone:</strong> {orderData?.phone_no}
          </p>
          <p>
            <strong>Address:</strong> {orderData?.address}, {orderData?.city}
          </p>
        </CardContent>
      </Card>

      {/* Back to Orders */}
      <div className="text-center">
        <Link to="/dashboard/orders/order-details">
          <Button className="px-6 py-2">View Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyOrder;

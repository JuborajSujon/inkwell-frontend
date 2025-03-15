/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useUpdateDeliveryOrderMutation } from "@/redux/features/order/orderApi";
import { Link } from "react-router-dom";

type TProductDetails = {
  brand: string;
  category: string;
  createdAt: string;
  description: string;
  inStock: boolean;
  isDeleted: boolean;
  model: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

type TProudct = {
  createdAt: string;
  price: number;
  productDetails: TProductDetails;
  productId: string;
  quantity: number;
  updatedAt: string;
  _id: string;
};

const OrderUpdate = ({ order, onClose }: any) => {
  const [updateDeliveryOrder] = useUpdateDeliveryOrderMutation();

  const handleUpdate = (id: string) => {
    const deliveryStatus = { deliverystatus: "shipping" };
    updateDeliveryOrder({
      updateData: deliveryStatus,
      orderId: id,
    });

    onClose();
  };
  return (
    <div>
      {/* order data table */}

      {order?.orderItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock QTY</th>

                <th className="py-3 px-4 text-left">Order QTY</th>
                <th className="py-3 px-4 text-left">Order Price</th>
                <th className="py-3 px-4 text-left">Order Date</th>
                <th className="py-3 px-4 text-left">Delivery Date</th>

                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems.map((product: TProudct) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                  <td className="py-3 px-4">
                    <img
                      src={product?.productDetails?.photo}
                      alt={product?.productDetails?.name}
                      className="h-12 w-12"
                    />
                  </td>
                  <td className="py-3 px-4">{product?.productDetails?.name}</td>
                  <td className="py-3 px-4">
                    {product?.productDetails?.price}
                  </td>
                  <td className="py-3 px-4">
                    {product?.productDetails?.quantity}
                  </td>
                  <td className="py-3 px-4">{product.quantity}</td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Link to={`/product/${product?.productId}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4">No orders found.</p>
      )}

      {/* order update form */}
      <div className="mt-4">
        <Button onClick={() => handleUpdate(order?._id)}>
          Delivery Confirm
        </Button>
      </div>
    </div>
  );
};

export default OrderUpdate;

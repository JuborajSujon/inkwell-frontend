import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllCartQuery } from "@/redux/features/cart/cartApi";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { ICartItem } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import Spinner from "@/components/spinner";
import { useEffect } from "react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector(useCurrentUser);
  const email = userInfo?.email;

  // Fetch user data
  const { data: userData } = useGetSingleUserQuery(email, {
    skip: !email,
  });
  const user = userData?.data;

  // Fetch cart data
  const { data: carts, isLoading, refetch } = useGetAllCartQuery(undefined);

  // Create order form handler
  const [
    createOrder,
    { isLoading: isCreatingOrder, isSuccess, data, isError, error },
  ] = useCreateOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const orderItems = carts?.data.items.map((item: ICartItem) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const orderDetail = {
      orderItems,
      shippingAddress: data?.shippingAddress,
      orderTitle: data?.orderTitle,
    };

    const res = await createOrder(orderDetail);

    if (res?.data?.success) {
      toast.success(res?.data?.message);
      refetch();

      setTimeout(() => {
        window.location.href = res?.data.data;
      }, 1000);
    }
  };

  const toastId = "order";
  useEffect(() => {
    if (isError) {
      toast.error(JSON.stringify(error), { id: toastId });
    }
  }, [data?.message, error, isError, isSuccess]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={"icon"} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="space-y-4">
        {/* Order List Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Order List</h2>
          {isLoading ? (
            <p>Loading cart items...</p>
          ) : carts?.data.items.length > 0 ? (
            <ul className="space-y-2">
              {carts.data.items.map((item: ICartItem) => (
                <li
                  key={item.productId._id}
                  className="flex justify-between border p-3 rounded-md dark:bg-gray-800 dark:text-gray-100">
                  <div>
                    <p className="font-semibold">{item.productId.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    ${item.productId.price * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="text-muted-foreground ">
                No items in cart. Please add items to{" "}
                <span className="underline text-blue-400">
                  <Link to="/all-products">cart</Link>
                </span>
                .
              </p>
            </div>
          )}
        </div>

        {/* Total Price */}
        <div>
          <h2 className="text-xl font-bold text-right">
            Grand Total: ${carts?.data.totalPrice || 0}
          </h2>
        </div>

        {/* Delivery Address */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium">Order Title</label>
            <input
              type="text"
              defaultValue="Order Invoice"
              {...register("orderTitle", { required: true })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
            />
            {errors.orderTitle && (
              <p className="text-red-500">Order title is required.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Delivery Address
            </label>
            <input
              type="text"
              value={user?.shippingAddress || ""}
              {...register("shippingAddress", { required: true })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Confirm Order Button */}
          <Button
            disabled={!carts?.data.items.length}
            type="submit"
            className="mt-4">
            {isCreatingOrder ? "Confirming..." : "Confirm Order"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useCreateAndUpdateCartMutation,
  useDeleteCartMutation,
  useDeleteSingleCartMutation,
  useGetAllCartQuery,
} from "@/redux/features/cart/cartApi";
import { ICartItem, IError } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [quantityInput, setQuantityInput] = useState<{ [key: string]: string }>(
    {}
  );
  const {
    data: carts,
    isLoading,
    refetch: refetchCarts,
  } = useGetAllCartQuery(undefined);

  const [deleteSingleCart] = useDeleteSingleCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [createAndUpdateCart, { isLoading: isUpdating }] =
    useCreateAndUpdateCartMutation();

  // Handle delete
  const handleDeleteCart = async (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  // Handle clear cart
  const handleDeleteAllCarts = () => {
    setIsClearModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        const res = await deleteSingleCart(selectedProductId).unwrap();
        if (res.success) {
          toast.success(res.message);
          setSelectedProductId(null);
          await refetchCarts();
          setIsDeleteModalOpen(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to delete cart");
      }
    }
  };

  const handleConfirmDeleteAllCart = async () => {
    try {
      const res = await deleteCart(undefined).unwrap();

      if (res.success) {
        toast.error(res.message);
        setIsClearModalOpen(false);

        await refetchCarts();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete cart");
    }
  };

  const handleQuantityIncrease = async (
    productId: string,
    quantity: number
  ) => {
    // Update the quantity of the product in the cart
    try {
      const productData = { productId, quantity: quantity + 1 };

      const res = await createAndUpdateCart(productData).unwrap();
      if (res.success) {
        toast.success("Cart updated successfully");
        await refetchCarts();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const handleQuantityDecrease = async (
    productId: string,
    quantity: number
  ) => {
    // Update the quantity of the product in the cart

    if (quantity <= 1) {
      toast.error("Minimum quantity is 1");
      return;
    }

    try {
      const productData = { productId, quantity: quantity - 1 };

      const res = await createAndUpdateCart(productData).unwrap();
      if (res.success) {
        toast.success("Cart updated successfully");
        await refetchCarts();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    // Find the previous quantity
    const previousQuantity = carts?.data?.items?.find(
      (item: ICartItem) => item.productId._id === productId
    )?.quantity;

    // Optimistically update the input value to the new quantity
    setQuantityInput((prev) => ({
      ...prev,
      [productId]: newQuantity.toString(),
    }));

    try {
      // Try updating the cart with the new quantity
      const res = await createAndUpdateCart({
        productId,
        quantity: newQuantity,
      }).unwrap();
      if (res.success) {
        toast.success("Cart updated successfully!");
        await refetchCarts();
      } else {
        // Handle unsuccessful update (if needed)
        toast.error("Failed to update cart");
      }
    } catch (error: unknown) {
      const err = error as IError;

      // Reset the input field to the previous quantity in case of error
      setQuantityInput((prev) => ({
        ...prev,
        [productId]: previousQuantity?.toString() ?? "1",
      }));

      // Show appropriate error message
      if (err.status === 400) {
        toast.error(err.data.message);
      } else {
        toast.error("Failed to update cart");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-lg sm:text-2xl font-bold mb-6">My Shopping Cart</h1>
      <div className="space-y-4">
        {!carts?.data?.items?.length && (
          <div className="flex items-center justify-center h-96">
            <h2 className="text-xl font-semibold">
              Your cart is empty. Add some products to the cart.
            </h2>
          </div>
        )}
        {carts?.data?.items?.map((item: ICartItem) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-5 p-4 border rounded-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
              <img
                src={item.productId.photo}
                alt={item.productId.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <h2 className="font-medium">{item.productId.name}</h2>
              <p className="text-sm text-gray-500 flex-1  sm:text-right">
                Price: ${item.price}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    handleQuantityDecrease(item.productId._id, item.quantity)
                  }
                  disabled={isUpdating || item.quantity <= 1}>
                  -
                </Button>
                {/* Editable Quantity Input */}
                <Input
                  type="number"
                  className="w-16 text-center border rounded-md px-2 py-1 dark:bg-gray-800 dark:text-gray-100"
                  value={
                    quantityInput[item.productId._id] ??
                    item.quantity.toString()
                  } // Allow empty string
                  min={1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^[0-9]+$/.test(value)) {
                      // Allow empty or numbers only
                      setQuantityInput((prev) => ({
                        ...prev,
                        [item.productId._id]: value,
                      }));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const newQuantity = parseInt(
                        quantityInput[item.productId._id] || "0",
                        10
                      );
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        handleQuantityChange(item.productId._id, newQuantity);
                      } else {
                        setQuantityInput((prev) => ({
                          ...prev,
                          [item.productId._id]: item.quantity.toString(),
                        })); // Reset if invalid
                      }
                    }
                  }}
                  onBlur={() => {
                    if (!quantityInput[item.productId._id]) {
                      setQuantityInput((prev) => ({
                        ...prev,
                        [item.productId._id]: item.quantity.toString(),
                      }));
                    }
                  }}
                  disabled={isUpdating}
                />
                <Button
                  size="sm"
                  onClick={() =>
                    handleQuantityIncrease(item.productId._id, item.quantity)
                  }
                  disabled={isUpdating}>
                  +
                </Button>
              </div>

              <div>
                <Button
                  size={"sm"}
                  onClick={() => handleDeleteCart(item.productId._id)}
                  variant="destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {carts?.data?.items?.length ? (
          <>
            <h2 className="text-xl font-bold">
              Grand Total: ${carts?.data?.totalPrice}
            </h2>
            <div className="flex justify-between items-center gap-4">
              <Button size={"sm"} onClick={() => {}} className="mt-4">
                Proceed to Checkout
              </Button>
              <Button
                size={"sm"}
                variant="destructive"
                onClick={handleDeleteAllCarts}
                className="mt-4">
                Clear Cart
              </Button>
            </div>
          </>
        ) : null}
      </div>
      {/* Deleted cart Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              {"Shopping Cart Deleted"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Are you sure you want to delete this cart?
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-2 p-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <h2 className="text-xl font-semibold leading-tight tracking-wide">
              Are you sure you want to delete this cart?
            </h2>
            <p className="flex-1 text-gray-600 dark:text-gray-400">
              This action cannot be undone. The cart will be permanently
              removed.
            </p>
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear Cart Modal */}
      <Dialog open={isClearModalOpen} onOpenChange={setIsClearModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              {"Shopping Cart Cleared"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Are you sure you want to delete all cart?
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-2 p-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <h2 className="text-xl font-semibold leading-tight tracking-wide">
              Are you sure you want to delete all cart?
            </h2>
            <p className="flex-1 text-gray-600 dark:text-gray-400">
              This action cannot be undone. The all cart will be permanently
              removed.
            </p>
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setIsClearModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDeleteAllCart}
                className="bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;

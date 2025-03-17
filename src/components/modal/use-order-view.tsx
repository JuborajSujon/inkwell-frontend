import { OrderItem } from "@/pages/Dashboard/OrderDetails";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export function OrderViewModal({ products }: { products: OrderItem[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Order Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order's product details</DialogTitle>
          <DialogDescription className="sr-only">
            product details goes here
          </DialogDescription>
        </DialogHeader>
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: OrderItem) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                    <td className="py-3 px-4">
                      <img
                        src={product.productId.photo}
                        alt={product.productId.name}
                        className="w-10 h-10"
                      />
                    </td>
                    <td className="py-3 px-4">{product.productId.name}</td>
                    <td className="py-3 px-4 text-center">
                      {product.quantity}
                    </td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Link to={`/product/${product.productId._id}`}>
                        <Button size={"sm"}>View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-4">No products found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

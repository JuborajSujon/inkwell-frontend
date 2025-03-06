import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/redux/features/product/productApi";
import Spinner from "@/components/spinner";
import image2 from "@/assets/avater2.jpg";
import image3 from "@/assets/avater3.jpg";
import { useCreateAndUpdateCartMutation } from "@/redux/features/cart/cartApi";
import { toast } from "sonner";

const outdoor = {
  id: 1,
  reviews: [
    {
      name: "Alice Johnson",
      rating: 5,
      comment: "Excellent quality!",
      img: image2,
    },
    {
      name: "Mark Thompson",
      rating: 4,
      comment: "Very nice and durable.",
      img: image3,
    },
  ],
};

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const product = data?.data;
  const category = product?.category;
  const [quantity, setQuantity] = useState<string | number>(1);
  const [isValid, setIsValid] = useState(true);

  // Fetch products
  const { data: similarProducts, isLoading: isSimilarLoading } =
    useGetAllProductsQuery(
      {
        searchTerm: category,
        page: 1,
        limit: 6,
      },
      {
        skip: !category,
      }
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string while typing, enforce numeric input
    if (value === "" || /^[0-9]+$/.test(value)) {
      setQuantity(value === "" ? "" : Number(value)); // Keep empty string for better UX
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleBlur = () => {
    // Ensure a valid number, default to 1 if empty
    if (quantity === "" || (typeof quantity === "number" && quantity < 1)) {
      setQuantity(1);
    }
  };

  // Create a new cart
  const [createAndUpdateCart, { isLoading: isUpdating }] =
    useCreateAndUpdateCartMutation();

  // Add product to cart
  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const productData = { productId, quantity: quantity };

      const res = await createAndUpdateCart(productData).unwrap();
      if (res.success) {
        toast.success("Cart added successfully");
        navigate("/dashboard/carts/my-cart-list");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <img
            src={product?.photo}
            alt={product?.name}
            className="w-full rounded-lg shadow-md"
          />
          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <p className="text-muted-foreground mt-2">
                {product?.description}
              </p>
              <p className="text-lg font-bold mt-4">${product?.price}</p>
            </div>
            <div className="mt-4 flex flex-col flex-1 justify-end">
              <span className="">Category: {product?.category} </span>
              <span className="font-semibold">
                Stock Status: {product?.inStock ? "Available" : "Out of Stock"}{" "}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, Number(q) - 1))}>
                -
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min={1}
                className={`w-28 text-center border ${
                  !isValid ? "border-red-500" : "border-gray-300"
                } rounded-md px-1 py-1 dark:bg-gray-800 dark:text-gray-100`}
                placeholder="Qty"
              />
              {!isValid && (
                <p className="text-red-500 text-xs">
                  Please enter a valid number
                </p>
              )}

              <Button onClick={() => setQuantity((q) => Number(q) + 1)}>
                +
              </Button>
            </div>
            <Button
              disabled={product?.inStock === false || isUpdating}
              onClick={() => handleAddToCart(product?._id, Number(quantity))}
              className="mt-4 w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Specifications Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 shadow-md flex flex-col">
              <span className="">Brand: {product?.brand} </span>
              <span className="">Modle: {product?.model} </span>
              <span className="">Stock Quantity: {product?.quantity} </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {outdoor.reviews.map((review, index) => (
              <Card
                key={index}
                className="p-4 shadow-md flex justify-start items-start">
                <Avatar className="w-12 h-12 mb-5">
                  <AvatarImage src={review.img} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mt-2">"{review.comment}"</p>
                  <h4 className="mt-1 font-semibold">- {review.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Similar Products Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
          <div className="flex justify-center items-center">
            {isSimilarLoading && (
              <div className="flex justify-center items-center h-96">
                {" "}
                <Spinner size="icon" />
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-6">
              {similarProducts?.data?.map(
                (item: {
                  _id: string;
                  name: string;
                  price: string;
                  photo: string;
                }) => (
                  <Card key={item._id} className="p-4 shadow-md">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full rounded-md"
                    />
                    <CardContent className="text-center mt-3">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-muted-foreground">{item.price}</p>
                      <Link to={`/product/${item._id}`}>
                        <Button className="mt-2 w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

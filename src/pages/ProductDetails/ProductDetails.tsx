import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Navbar from "@/pages/Components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const product = {
  id: 1,
  name: "Luxury Leather Notebook",
  image: "/src/assets/product.jpg",
  description: "A premium leather-bound notebook for all your creative ideas.",
  price: "$25.99",
  colors: ["Black", "Brown", "Navy"],
  stock: 12,
  specifications: [
    { label: "Material", value: "Genuine Leather" },
    { label: "Pages", value: "200" },
    { label: "Size", value: "A5" },
  ],
  reviews: [
    { name: "Alice Johnson", rating: 5, comment: "Excellent quality!" },
    { name: "Mark Thompson", rating: 4, comment: "Very nice and durable." },
  ],
  similarProducts: [
    {
      id: 2,
      name: "Classic Journal",
      price: "$19.99",
      image: "/src/assets/journal.jpg",
    },
    {
      id: 3,
      name: "Pocket Sketchbook",
      price: "$15.99",
      image: "/src/assets/sketchbook.jpg",
    },
  ],
};

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.description}</p>
            <p className="text-lg font-bold mt-4">{product.price}</p>
            <div className="mt-4">
              <span className="font-semibold">Available Colors:</span>
              <div className="flex gap-2 mt-1">
                {product.colors.map((color) => (
                  <span key={color} className="px-3 py-1 bg-gray-200 rounded">
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity((q) => q + 1)}>+</Button>
            </div>
            <Button className="mt-4 w-full">Add to Cart</Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <Card
                key={index}
                className="p-4 shadow-md flex justify-start items-start">
                <Avatar className="w-12 h-12 mb-5">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
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

        {/* Specifications Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {product.specifications.map((spec, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                <span className="font-semibold">{spec.label}: </span>
                {spec.value}
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.similarProducts.map((item) => (
              <Card key={item.id} className="p-4 shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded-md"
                />
                <CardContent className="text-center mt-3">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">{item.price}</p>
                  <Button className="mt-2 w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

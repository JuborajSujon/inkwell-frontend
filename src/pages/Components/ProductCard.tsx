import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import PlaceholderImage from "@/assets/placeholder image.png";

interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  photo: string;
  description: string;
  quantity: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="p-4 shadow-md h-full flex flex-col justify-between">
      <img
        src={product?.photo || PlaceholderImage}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <CardContent className="text-center space-y-1 mt-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold truncate">{product.name}</h3>
        {/* <p className=" flex-grow">{product.description}</p> */}
        <p className="text-sm text-gray-500">{product.brand}</p>
        <span className="text-lg font-bold">${product.price}</span>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link to={`/product/${product?._id}`} className="block h-full">
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

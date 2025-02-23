import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: any) {
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <Card className="p-4 shadow-md h-full flex flex-col justify-between">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <CardContent className="text-center space-y-3 mt-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className=" flex-grow">{product.description}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
          <span className="text-lg font-bold">{product.price}</span>
        </CardContent>
      </Card>
    </Link>
  );
}

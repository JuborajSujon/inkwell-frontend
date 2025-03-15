import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Spinner from "@/components/spinner";

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
export default function FeaturedProducts() {
  // Fetch products
  const { data, isLoading } = useGetAllProductsQuery(undefined);

  return (
    <section className="space-y-14 py-20 max-w-7xl mx-auto px-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Featured Products</h2>
        <p className="mt-2">
          Discover our hand-picked selection of top stationery items.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-96">
          <Spinner size="icon" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data &&
          data?.data
            ?.slice(0, 8)
            .map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild>
          <Link to="/all-products">View All</Link>
        </Button>
      </div>
    </section>
  );
}

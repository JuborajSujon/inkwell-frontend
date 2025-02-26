import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import ReactPaginate from "react-paginate";

import Spinner from "@/components/spinner";
import ProductCard from "../Components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

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

export default function AllProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [inStock, setInStock] = useState(true);

  const limit = 10;

  // Fetch products with filters
  const { data, isLoading, error } = useGetAllProductsQuery({
    searchTerm: searchTerm || "",
    category: category || "",
    brand: brand || "",
    "price[gte]": priceRange[0],
    "price[lte]": priceRange[1],
    inStock,
    page: currentPage || 1,
    limit: limit || 10,
  });

  const products = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setBrand("");
    setPriceRange([0, 2000]);
    setInStock(true);
    setCurrentPage(1);
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  if (error) return <p>Error loading products</p>;

  return (
    <div className="container mx-auto p-4">
      <div>
        <h2 className="text-xl sm:text-3xl font-bold mb-4">All Products</h2>
      </div>
      {/* Search and Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Category Filter */}
        <Select
          value={category}
          onValueChange={(val) => setCategory(val === "all" ? "" : val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Writing">Writing</SelectItem>
            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
            <SelectItem value="Art Supplies">Art Supplies</SelectItem>
            <SelectItem value="Educational">Educational</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500 mb-1">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </p>
          <Slider
            min={0}
            max={2000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
          />
        </div>

        {/* Availability Switch */}
        <div className="flex items-center space-x-2">
          <Switch checked={inStock} onCheckedChange={setInStock} />
          <span className="text-sm text-gray-600">In Stock Only</span>
        </div>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200">
          Reset Filters
        </button>
      </div>

      {/* Products Grid */}
      <div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName={"flex list-none space-x-2"}
            pageClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            activeClassName={"bg-blue-500 text-white"}
            previousClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            nextClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      )}
    </div>
  );
}

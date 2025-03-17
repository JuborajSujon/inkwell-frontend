/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import ReactPaginate from "react-paginate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // ShadCN Modal
import UpdateProduct from "@/components/modal/use-update-product";
import Spinner from "@/components/spinner";
import PlaceholderImage from "@/assets/placeholder image.png";

interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  photo: string;
  inStock: boolean;
}

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const limit = 10;

  // Fetch products
  const { data, isLoading, error } = useGetAllProductsQuery({
    searchTerm: searchTerm || "",
    page: currentPage || 1,
    limit: limit || 10,
  });

  const products = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const [deleteProduct, { isLoading: isDeleted }] = useDeleteProductMutation();

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // Handle delete
  const handleDeleteProduct = async (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        await deleteProduct(selectedProductId).unwrap();
        toast.success("Product deleted successfully");
        setIsDeleteModalOpen(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Products</CardTitle>
          <Button
            onClick={() => navigate("/dashboard/product/create-product")}
            className="flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Brand</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Quantity</th>
                    <th className="py-3 px-4 text-left">In Stock</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: IProduct) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                      <td className="py-3 px-4">
                        <img
                          src={product.photo || PlaceholderImage}
                          alt={product.name}
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-3 px-4 text-nowrap">{product.name}</td>
                      <td className="py-3 px-4">{product.brand}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        ${product.quantity.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs text-nowrap">
                          {product.inStock ? (
                            <span className="text-green-500">In Stock</span>
                          ) : (
                            <span className="text-red-500">Out of Stock</span>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(product)}>
                          <Edit size={16} className="" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={isDeleted}>
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">No products found.</p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
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
        </CardFooter>
      </Card>

      {/* Update Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="w-full max-w-3xl mx-4">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription className="sr-only">
              Edit the details of the product.
            </DialogDescription>
          </DialogHeader>
          <UpdateProduct
            product={selectedProduct}
            onClose={setIsUpdateModalOpen}
          />
        </DialogContent>
      </Dialog>

      {/* Deleted Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              {isDeleted ? "Product Deleted" : "Delete Product"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isDeleted
                ? "The product has been successfully deleted."
                : "Are you sure you want to delete this product?"}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-2 p-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <h2 className="text-xl font-semibold leading-tight tracking-wide">
              Are you sure you want to delete this product?
            </h2>
            <p className="flex-1 text-gray-600 dark:text-gray-400">
              This action cannot be undone. The product will be permanently
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
    </div>
  );
};

export default ProductList;

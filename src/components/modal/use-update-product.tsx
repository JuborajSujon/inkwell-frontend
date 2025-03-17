/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { Loader2, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { imageUpload } from "@/utils/imageUpload";
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import axios from "axios";

// Define the form validation schema using Zod
const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  model: z.string().min(1, "Model is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quantity: z.number().int().min(0, "Quantity must be 0 or greater"),
  inStock: z.boolean(),
  photo: z.string().optional(),
});

// Type for the form data
type ProductFormData = z.infer<typeof productSchema>;

export const UpdateProduct = ({ product, onClose }: any) => {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<string | null>(
    product?.photo
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // use the RTK Query mutation hook
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      name: product?.name,
      brand: product?.brand,
      price: Number(product?.price),
      category: product?.category,
      model: product?.model,
      photo: product?.photo,
      description: product?.description,
      quantity: Number(product?.quantity),
      inStock: product?.inStock,
    },
  });

  // Handle file change for image upload
  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Check file type
  //   if (!file.type.includes("image")) {
  //     toast.error("Please upload an image file");
  //     return;
  //   }

  //   // Check file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     toast.error("File size should be less than 5MB");
  //     return;
  //   }

  //   // Create a preview of the selected image
  //   // Upload the image to ImgBB
  //   try {
  //     const image_data = await imageUpload(file);

  //     if (image_data.success) {
  //       const imageUrl = image_data.data.display_url;
  //       form.setValue("photo", imageUrl);
  //       setPreviewImage(imageUrl);
  //       toast.success("Image uploaded successfully!");
  //     } else {
  //       toast.error("Image upload failed, please try again.");
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     toast.error("Image upload error, please try again.");
  //   }
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes("image")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Create a fresh AbortController for this request
    const controller = new AbortController();
    const signal = controller.signal;

    // Toast step
    const toastId = toast.loading("Uploading image...");

    // Set a timeout to cancel the request if it takes too long (60s)
    const timeoutId = setTimeout(() => {
      controller.abort();
      toast.error("Upload took too long. You can add an image later.", {
        id: toastId,
      });
    }, 60000);

    try {
      // Upload image with timeout handling
      const image_data = await imageUpload(file, { signal });

      if (image_data?.success) {
        const imageUrl = image_data.data.display_url;
        form.setValue("photo", imageUrl);
        setPreviewImage(imageUrl);
        toast.success("Image uploaded successfully!", { id: toastId });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        toast.error(
          "Image upload was cancelled. Upload took too long. You can add an image later.",
          { id: toastId }
        );
      } else {
        toast.error(error.message || "Image upload error, please try again.");
      }

      // Reset image field so user can retry
      form.setValue("photo", "");
      setPreviewImage(null);
    } finally {
      clearTimeout(timeoutId); // Ensure timeout is cleared
    }
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      const res = await updateProduct({ id: product._id, data }).unwrap();
      if (res.success) {
        toast.success(res.message);
        onClose(false);
        navigate("/dashboard/product/product-list");
      }
    } catch (error: any) {
      console.error("Failed to create product:", error);
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3 md:gap-5 max-h-[500px] md:max-h-[650px] overflow-y-auto pr-3 lg:pr-6 ">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Product Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    {...field}
                    className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Brand*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter brand name"
                    {...field}
                    className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Model */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Model*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter model name"
                    {...field}
                    className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Price*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Quantity*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Category*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="dark:bg-slate-200 dark:text-slate-900">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="Office Supplies">
                      Office Supplies
                    </SelectItem>
                    <SelectItem value="Art Supplies">Art Supplies</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="ml-2">
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    {...field}
                    className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload with Preview */}
          <FormField
            control={form.control}
            name="photo"
            render={() => (
              <FormItem className="ml-2">
                <FormLabel>Product Image</FormLabel>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    {previewImage ? (
                      <div className="w-full">
                        <img
                          src={previewImage}
                          alt="Product preview"
                          className="mx-auto max-h-48 object-contain"
                        />
                        <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Click to upload product image
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* In Stock Toggle */}
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 ml-2 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Available in Stock</FormLabel>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Toggle if the product is currently available
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      {...field}
                      defaultChecked={field.value}
                      value={String(field.value)}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-5 ml-2 flex-row justify-between md:mt-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update Product
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProduct;

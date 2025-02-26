/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
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
import {
  useGetSingleUserQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

// Define the form validation schema using Zod
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  status: z.string().min(1, "Status is required"),
  shippingAddress: z.string().min(10, "Bio must be at least 10 characters"),
  photo: z.string().optional(),
});

// Type for the form data
type UserFormData = z.infer<typeof userSchema>;

export const UserProfilePage = () => {
  const userInfo = useAppSelector(useCurrentUser);

  const email = userInfo?.email;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch the user data
  const { data: userData, isLoading: isFetching } = useGetSingleUserQuery(
    email,
    {
      skip: !email,
    }
  );

  const user = userData?.data;

  const [previewImage, setPreviewImage] = useState<string | null>(user?.photo);

  // Mutations
  const [updateUserProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserProfileMutation();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      photo: user?.photo || "",
      status: user?.status || "",
      shippingAddress: user?.shippingAddress || "",
    },
  });

  // Set initial form values when user data is fetched
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        photo: user.photo,
        status: user.status,
        shippingAddress: user.shippingAddress,
      });
      setPreviewImage(user.photo);
    }
  }, [user, form]);

  // Handle file change for image upload
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

    // Upload the image to ImgBB
    try {
      const image_data = await imageUpload(file);

      if (image_data.success) {
        const imageUrl = image_data.data.display_url;
        form.setValue("photo", imageUrl);
        setPreviewImage(imageUrl);
        toast.success("Image uploaded to ImgBB successfully!");
      } else {
        toast.error("Image upload failed, please try again.");
      }
    } catch (error) {
      toast.error("Image upload error, please try again.");
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      if (user?._id) {
        // Update profile
        const res = await updateUserProfile({
          id: user._id,
          userData: data,
        }).unwrap();

        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profile Photo */}
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
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
                            alt="Profile preview"
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
                            Click to upload profile photo
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
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger className="dark:bg-slate-200 dark:text-slate-900">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ShippingAddress */}
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Shipping Address*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your bio"
                        {...field}
                        className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfilePage;

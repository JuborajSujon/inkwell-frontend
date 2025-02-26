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
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import useLogout from "@/hooks/use-logout";

// Define the form validation schema using Zod
const userSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

// Type for the form data
type UserFormData = z.infer<typeof userSchema>;

export const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const logout = useLogout();
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      const res = await changePassword(data).unwrap();

      if (res.success) {
        toast.success(res.message);
        form.reset();
        logout();
      }
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Old Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password*</FormLabel>
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
            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password*</FormLabel>
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterDialogProps {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const form = useForm<RegisterDialogProps>({
    mode: "onBlur", // Validate on blur or change
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterDialogProps> = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerUser(data).unwrap();

      if (!res.success) {
        form.setError("password", {
          type: "manual",
          message: res.message || "Registration failed. Please try again.",
        });
      }
      toast.success(res.message, {
        duration: 1500,
        description: "Plese login with your credentials.",
      });
      form.reset();
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error?.data?.message) toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center  px-5 py-8 ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-lg font-bold uppercase  lg:text-4xl">
              Register
            </h1>
          </CardTitle>
          <CardDescription className="sr-only">
            Please register to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "Name is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        type="text"
                        className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                        type="email"
                        className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type={showPass ? "text" : "password"}
                          className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                        />
                        <div
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-black">
                          {showPass ? <EyeIcon /> : <EyeClosed />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button type="submit" disabled={!form.formState.isValid}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[10px] font-bold uppercase  md:text-sm">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="cursor-pointer text-[10px] font-bold uppercase text-blue-600 hover:underline md:text-sm">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;

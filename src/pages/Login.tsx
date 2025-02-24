import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

interface LoginDialogProps {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [showPass, setShowPass] = useState(false);

  const form = useForm<LoginDialogProps>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginDialogProps> = async (data) => {
    const res = await login(data).unwrap();

    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user, token: res.data.accessToken }));

    toast.success("Login successful", { duration: 1500 });

    form.reset();
    navigate("/");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center  px-5 py-8 ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-lg font-bold uppercase  lg:text-4xl">Login</h1>
          </CardTitle>
          <CardDescription className="sr-only">
            Please login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[10px] font-bold uppercase  md:text-sm">
              Don&apos;t have an account?
            </p>
            <Link
              to="/register"
              className="cursor-pointer text-[10px] font-bold uppercase text-blue-600 hover:underline md:text-sm">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

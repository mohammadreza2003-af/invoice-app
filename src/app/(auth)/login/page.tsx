"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { LoginSubmitFrom } from "@/constant/types";
import { login } from "@/services/auth";
import { showToast } from "@/utils/helper";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginSubmitFrom>();
  const { errors } = formState;
  const { isPending, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      router.push("/");
      showToast("Successfuly", "Loign successful");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit: SubmitHandler<LoginSubmitFrom> = (data) => {
    mutate(data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8 space-y-8 bg-background rounded shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            {errors.email?.message && (
              <p className="text-red-500 font-medium">{errors.email.message}</p>
            )}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </Label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  validate: (value: string) =>
                    value.length >= 8 || "The Password is very short",
                })}
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
            <div>
              <Button
                disabled={isPending}
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium"
              >
                {isPending ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-start">
            <p className="text-center text-sm">
              Dont have an account?
              <Link href="/signup" className="hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-center text-sm">
              <Link href="/forgot-password" className="hover:underline">
                Forgot password
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import useUserData from "@/hooks/useUserData";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginSubmitFrom>();
  const { errors } = formState;

  const query = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      query.invalidateQueries({
        queryKey: ["userData"],
      });
      router.push("/");
      showToast("Successfuly", "Loign successful");
    },
    onError: (err) => {
      showToast("Error", err.message);
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
            <div className="relative">
              <Label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`block w-full px-3 py-2 mt-1 border ${
                  errors.email ? "border-red-500" : ""
                } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50`}
              />
              {errors.email && (
                <p className="absolute inset-y-0 right-0 top-[40%] flex items-center pr-3 text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </Label>
              <Input
                type="password"
                {...register("password", {
                  required: "The Password is required",
                  validate: (value: string) =>
                    value.length >= 8 || "The Password is very short",
                })}
                className={`block w-full px-3 py-2 mt-1 border ${
                  errors.password ? "border-red-500" : ""
                } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50`}
              />
              {errors.password && (
                <p className="absolute inset-y-0 right-0 top-[40%] flex items-center pr-3 text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
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

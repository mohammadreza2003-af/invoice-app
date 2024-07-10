"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import { SignUpSubmitFrom } from "@/constant/types";
import { signup } from "@/services/auth";

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

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, getValues, formState } =
    useForm<SignUpSubmitFrom>();
  const { errors } = formState;
  const { isPaused, mutate, status } = useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      console.log(res);
      router.push("/signup/confirm");
    },
  });

  const onSubmit: SubmitHandler<SignUpSubmitFrom> = (data) => {
    const { password, email, fullName } = data;
    mutate({ password, email, fullName });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8 space-y-8 bg-background rounded shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <Label
                htmlFor="fullname"
                className="block text-sm font-medium mb-2"
              >
                Full Name
              </Label>
              <Input
                type="text"
                {...register("fullName", {
                  required: "Full Name is required",
                  validate: (value: string) =>
                    value.length > 5 || "The Full Name is very short",
                })}
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            {errors.fullName?.message && (
              <p className="text-red-500 font-medium">
                {errors.fullName.message}
              </p>
            )}
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
                  required: "The Password is required",
                  validate: (value: string) =>
                    value.length > 8 || "The Password is very short",
                })}
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
            <div className="relative">
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </Label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value: any) =>
                    value === getValues().password || "Password don't match",
                })}
                className={`block w-full px-3 py-2 mt-1 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50`}
              />
              {errors.confirmPassword && (
                <p className="absolute inset-y-0 right-0 top-[40%] flex items-center pr-3 text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <Button
                disabled={isPaused}
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium"
              >
                {isPaused ? "Loading..." : "Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm ">
            Already have an account?
            <Link href="/login" className="hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;

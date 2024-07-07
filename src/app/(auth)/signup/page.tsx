"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
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
  const [error, setError] = useState("");
  const { isLoading, mutate, status } = useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      console.log(res);
      router.push("/signup/confirm");
    },
  });

  const { register, handleSubmit } = useForm<SignUpSubmitFrom>();

  const onSubmit: SubmitHandler<SignUpSubmitFrom> = (data) => {
    const { password, confirmPassword, email, fullName } = data;
    if (!password || !confirmPassword || !email) {
      setError("All fileds required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    mutate({ password, email, fullName });
  };

  console.log(status);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-8 space-y-8 bg-background rounded shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label
                htmlFor="fullname"
                className="block text-sm font-medium mb-2"
              >
                Full Name
              </Label>
              <Input
                type="text"
                {...register("fullName")}
                required
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </Label>
              <Input
                type="email"
                {...register("email")}
                required
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </Label>
              <Input
                type="password"
                {...register("password")}
                required
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                {...register("confirmPassword")}
                required
                className="block w-full px-3 py-2 mt-1"
              />
            </div>
            {error && <p className="text-red-500 font-medium">{error}</p>}
            <div>
              <Button
                disabled={isLoading}
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium"
              >
                {isLoading ? "Loading..." : "Sign up"}
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

"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotpassword } from "@/services/auth";
import { useMutation } from "react-query";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: string; message: string }>({
    type: "",
    message: "",
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: forgotpassword,
    onSuccess: (res) => {
      setMessage({
        type: "success",
        message: "Password reset email sent. Please check your inbox.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
      setMessage({ type: "error", message: "Something went wrong." });
      console.log(error, "error");
    },
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    const { email } = data;

    if (!email) {
      setMessage({ type: "error", message: "Email is required" });
      return;
    }
    mutate(email);
  };

  const { register, handleSubmit } = useForm<{ email: string }>();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[350px] w-full">
        <h1 className="text-center text-2xl mb-4 text-primary">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-y-2">
            <Label htmlFor="email" className="text-primary">
              Email
            </Label>
            <Input
              placeholder="mammad@example.com"
              type="email"
              {...register("email")}
              required
              aria-label="Email address"
            />
          </div>

          {message.message && message.type === "success" && (
            <p className="text-green-500 text-sm mb-4">{message.message}</p>
          )}
          {message.message && message.type === "error" && (
            <p className="text-red-500 text-sm mb-4">{message.message}</p>
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Send Reset Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}

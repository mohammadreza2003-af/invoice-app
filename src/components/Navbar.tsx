"use client";

import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signout } from "@/services/auth";
import { showToast } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const query = useQueryClient();
  const router = useRouter();

  const { isLogin } = useAuth();
  const handleSignout = async () => {
    const res = await signout();
    if (res.ok) {
      query.invalidateQueries({
        queryKey: ["userData"],
      });
      showToast("Successfuly", "Logout successful. See you next time!");
      router.push("/login");
    }
  };

  return (
    <nav className="xl:max-w-[120rem] w-full h-full flex items-center justify-between">
      <Image
        src="/assets/logo.svg"
        width={72}
        height={72}
        alt="Logo"
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="flex gap-x-8 justify-between h-full items-center mr-4">
        <ModeToggle />
        <div className="w-[1px] h-full bg-slate-500 cursor-pointer" />
        <Image
          className="rounded-full"
          src="/assets/image-avatar.jpg"
          width={40}
          height={40}
          alt="Logo"
        />
        {isLogin && (
          <Button
            onClick={() => handleSignout()}
            className="dark:text-white text-white"
            variant="none"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

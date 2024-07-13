"use client";

import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signout } from "@/services/auth";
import { showToast } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import { Toggle } from "@/components/ui/toggle";
import useAuth from "@/hooks/useAuth";
import { Bold } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const query = useQueryClient();
  const router = useRouter();
  const { setTheme } = useTheme();

  const [toggle, setToggle] = useState("system");

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

  const handleToggleChange = (isToggled: string) => {
    console.log(isToggled);
    if (isToggled) {
      setTheme("dark");
    } else {
      setTheme("light");
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
      <div className="flex sm:gap-x-8 gap-x-4 justify-between h-full items-center mr-4">
        <div className="flex items-center justify-center">
          <Button variant="none" onClick={() => setTheme("light")}>
            <Image
              src="/assets/icon-sun.svg"
              width={24}
              height={24}
              alt="moon"
            />
          </Button>
          <Button variant="none" onClick={() => setTheme("dark")}>
            <Image
              src="/assets/icon-moon.svg"
              width={24}
              height={24}
              alt="moon"
            />
          </Button>
        </div>
        <div className="w-[1px] h-full bg-slate-500 cursor-pointer" />
        <Image
          className="rounded-full sm:w-[40px] w-[32px]"
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

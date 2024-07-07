"use client";

import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="xl:max-w-[120rem] w-full h-full flex items-center justify-between">
      <Image src="/assets/logo.svg" width={72} height={72} alt="Logo" />
      <div className="flex gap-x-8 justify-between h-full items-center mr-4">
        <ModeToggle />
        <div className="w-[1px] h-full bg-slate-500" />
        <Image
          className="rounded-full"
          src="/assets/image-avatar.jpg"
          width={40}
          height={40}
          alt="Logo"
        />
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button size="icon" variant="modeToggle">
          <Image
            src="/assets/icon-sun.svg"
            alt="sun"
            width={12}
            height={12}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Image
            src="/assets/icon-moon.svg"
            alt="sun"
            width={12}
            height={12}
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 dark:bg-foreground">
        <div className="flex items-center justify-center">
          <Button variant="none" onClick={() => setTheme("light")}>
            Light
          </Button>
          <Button variant="none" onClick={() => setTheme("dark")}>
            Dark
          </Button>
          <Button variant="none" onClick={() => setTheme("system")}>
            System
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

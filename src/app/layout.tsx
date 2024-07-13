import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Providers from "./Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-Spartan overflow-y-scroll scrollbar-hide",
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
          <main className="scrollbar-hide">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

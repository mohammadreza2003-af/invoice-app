"use client";

import Invoice from "@/components/Invoice";
import InvoiceHeader from "@/components/InvoiceHeader";
import { Button } from "@/components/ui/button";
import { getAllInvoices } from "@/services/apiInvoice";
import { signout } from "@/services/auth";
import { showToast } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();
  const handleSignout = async () => {
    const res = await signout();
    if (res.ok) {
      showToast("Successfuly", "Logout successful. See you next time!");
      router.push("/login");
    }
  };

  return (
    <div className="mx-auto md:w-[45rem] sm:w-[35rem] w-[24rem] min-h-[80vh]">
      <InvoiceHeader />
      {/* <Button onClick={() => handleSignout()} /> */}
      <Invoice />
    </div>
  );
}

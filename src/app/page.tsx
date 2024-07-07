"use client";

import Invoice from "@/components/Invoice";
import InvoiceHeader from "@/components/InvoiceHeader";
import { Button } from "@/components/ui/button";
import { checkUser, signout } from "@/services/auth";
import { showToast } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useQueries, useQuery } from "react-query";

export default function Home() {
  const router = useRouter();
  const handleSignout = async () => {
    const res = await signout();
    if (res.ok) {
      showToast("Successfuly", "Logout successful. See you next time!");
      router.push("/login");
    }
  };

  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: checkUser,
  });

  console.log(data, "user");

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh]">
      <InvoiceHeader />
      <Invoice />
    </div>
  );
}

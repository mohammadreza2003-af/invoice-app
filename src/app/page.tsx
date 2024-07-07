"use client";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => handleSignout()}>SignOut</Button>
    </main>
  );
}

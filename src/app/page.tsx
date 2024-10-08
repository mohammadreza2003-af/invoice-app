"use client";

import Invoice from "@/components/Invoice";
import InvoiceHeader from "@/components/InvoiceHeader";
export default function Home() {
  return (
    <div className="mx-auto md:w-[45rem] sm:w-[35rem] min-w-[20rem] min-h-[80vh] scrollbar-hide">
      <InvoiceHeader />
      <Invoice />
    </div>
  );
}

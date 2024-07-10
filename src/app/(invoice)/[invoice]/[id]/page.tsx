"use client";
import useInvoices from "@/app/hooks/useInvoices";
import { getInvoiceById } from "@/services/apiInvoice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const InvoiceId = () => {
  const { id } = useParams();

  const { mutate, data } = useMutation({
    mutationFn: getInvoiceById,
  });

  useEffect(() => {
    const fetch = async () => {
      mutate(1);
    };
    fetch();
  }, []);
  console.log(data);
  return (
    <div className="my-16 h-[20%]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-primary md:text-4xl text-xl">
            Invoices
          </h2>
        </div>
        <div className="flex items-center justify-center gap-x-4"></div>
      </div>
    </div>
  );
};

export default InvoiceId;

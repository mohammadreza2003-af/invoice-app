"use client";
import { useParams } from "next/navigation";

const InvoiceId = () => {
  const { id } = useParams();
  console.log(id);
  return <div>InvoiceId</div>;
};

export default InvoiceId;

import { InvoiceType } from "@/constant/types";
import { getAllInvoices } from "@/services/apiInvoice";
import { useQuery } from "@tanstack/react-query";

const useInvoices = () => {
  return useQuery<InvoiceType[], Error>({
    queryKey: ["Invoices"],
    queryFn: getAllInvoices,
  });
};

export default useInvoices;

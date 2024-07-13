import { InvoiceType } from "@/constant/types";
import { getInvoiceById } from "@/services/apiInvoice";
import { useQuery } from "@tanstack/react-query";

const useInvoiceById = (id: string) => {
  return useQuery<InvoiceType, Error>({
    queryKey: [id],
    queryFn: async ({ queryKey }) => {
      const invoiceId = Number(queryKey[0]) as number;
      return await getInvoiceById(invoiceId);
    },
    enabled: !!id,
  });
};

export default useInvoiceById;

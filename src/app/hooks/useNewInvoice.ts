import { newInvoice } from "@/services/apiInvoice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useNewInvoice = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewInvouce } = useMutation({
    mutationFn: newInvoice,
    onSuccess: (res) => {
      console.log("success", res);
      queryClient.invalidateQueries({
        queryKey: ["Invoices"],
      });
    },
  });

  return { createNewInvouce };
};

export default useNewInvoice;

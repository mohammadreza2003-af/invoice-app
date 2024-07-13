import { InvoiceType } from "@/constant/types";
import { newInvoice } from "@/services/apiInvoice";
import { showToast } from "@/utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditInvoiceParams {
  data: InvoiceType;
  id: number;
}

const useNewInvoice = () => {
  const queryClient = useQueryClient();

  const onSuccessHandler = (res: any) => {
    console.log("success", res);
    queryClient.invalidateQueries({ queryKey: ["Invoices"] });
  };

  const onErrorHandler = (err: any) => {
    showToast("Error", err.message);
  };

  const { mutate: createNewInvoice } = useMutation({
    mutationFn: (data: InvoiceType) => newInvoice(data),
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  const { mutate: editInvoice } = useMutation({
    mutationFn: ({ data, id }: EditInvoiceParams) => newInvoice(data, id),
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  return { createNewInvoice, editInvoice };
};

export default useNewInvoice;

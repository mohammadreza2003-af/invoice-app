"use client";

import { deleteInvoice } from "@/services/apiInvoice";
import { formatDate, nameFixer, showToast } from "@/utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NewInvoice from "@/components/NewInvoice";
import useInvoiceById from "@/app/hooks/useInvoiceById ";
import Image from "next/image";
import useNewInvoice from "@/app/hooks/useNewInvoice";
import { Skeleton } from "@/components/ui/skeleton";

const InvoiceId = () => {
  const { id } = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { editInvoice } = useNewInvoice();

  const { data: invoice, isPending } = useInvoiceById(String(id));
  const renderInvoiceStatus = (status: "paid" | "pending" | "draft") => {
    const statusClasses = {
      paid: "bg-greenLow text-greenLight",
      pending: "bg-orangeLow text-orangeLight",
      draft: "bg-grayLow text-white",
    };

    const dotClasses = {
      paid: "bg-greenLight",
      pending: "bg-orangeLight",
      draft: "bg-white",
    };

    return (
      <div
        className={`min-w-[96px] flex py-2 rounded-lg gap-x-2 justify-center items-center ${statusClasses[status]}`}
      >
        <div className={`w-2 h-2 rounded-full ${dotClasses[status]}`} />
        <h2>{nameFixer(status)}</h2>
      </div>
    );
  };

  const { mutate: deleteIn } = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: (res) => {
      showToast("Successfuly", res.message);
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
      router.push("/");
    },
    onError: (err) => {
      showToast("Error", err.message);
      console.log(err);
    },
  });

  const { mutate: markPaid, isPending: markIsPending } = useMutation<Error>({
    // @ts-ignore
    mutationFn: editInvoice,
    onSuccess: (res) => {
      showToast("Successfuly", "Paid");
      queryClient.invalidateQueries({
        queryKey: [String(id)],
      });
    },
    onError: (err) => {
      showToast("Error", err.message);
      console.log(err);
    },
  });


  if (isPending || !invoice || markIsPending) {
    return (
      <div className="mx-auto md:w-[45rem] sm:w-[35rem] w-[24rem] min-h-[80vh] mt-28">
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-[30px] w-[60px] rounded-lg dark:bg-foreground bg-slate-200" />
          <Skeleton className="h-[100px] w-full rounded-lg dark:bg-foreground bg-slate-200" />
          <Skeleton className="h-[400px] w-full rounded-lg dark:bg-foreground bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto md:w-[45rem] sm:w-[35rem] w-[24rem] min-h-[80vh] mt-28">
      <div
        className="flex items-center gap-x-2 mb-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/assets/icon-arrow-left.svg"
          alt="back"
          width={12}
          height={12}
        />
        <p className="dark:text-white">Go Back</p>
      </div>
      <div className="h-[20%]  dark:bg-foreground p-8 rounded-lg invoice-shadow">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center md:justify-center justify-between md:w-fit w-full gap-x-4">
            <h2 className="font-semibold text-primary md:text-lg text-md">
              Status
            </h2>
            <div>{renderInvoiceStatus(invoice?.status)}</div>
          </div>
          <div className="md:flex hidden  items-center gap-x-2 justify-center">
            <NewInvoice invoiceToEdit={invoice} />
            <Button
              onClick={() => deleteIn(Number(id))}
              className="dark:bg-foreground dark:text-white dark:bg-red-500 bg-red-500 text-white hover:bg-red-400 hover:dark:bg-red-400 rounded-full"
            >
              Delete
            </Button>
            {invoice.status === "pending" && (
              <Button
                onClick={() =>
                  // @ts-ignore
                  markPaid({
                    data: { ...invoice, status: "paid" },
                    id: Number(id),
                  })
                }
                className="dark:bg-foreground bg-purpleDark dark:text-white dark:bg-purpleDark text-white hover:bg-purpleLight hover:dark:bg-purpleLight rounded-full"
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 dark:bg-foreground p-8 rounded-lg dark:text-white invoice-shadow mb-20">
        <div>
          <div className="flex md:flex-row flex-col items-start w-full justify-center md:justify-between gap-y-4 mb-8">
            <div className="flex items-start flex-col justify-start gap-x-4">
              <h2>
                <span className="text-purpleDark">#</span>
                <span className="font-semibold ">{invoice?.id}</span>
              </h2>
              <div>
                <p>{invoice.description}</p>
              </div>
            </div>
            <div>
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-start w-full md:justify-between justify-center gap-y-4">
            <div className="flex justify-start items-start gap-x-8">
              <div className="flex items-start flex-col justify-start gap-y-4">
                <div>
                  <span className="text-purpleDark">Invoice Date</span>
                  <h2>
                    <span className="font-bold text-xl">
                      {formatDate(invoice?.created_at)}
                    </span>
                  </h2>
                </div>
                <div>
                  <span className="text-purpleDark">Payment Due</span>
                  <h2>
                    <span className="font-semibold text-xl">
                      {formatDate(invoice?.paymentDue)}
                    </span>
                  </h2>
                </div>
              </div>
              <div>
                <div className="flex items-start flex-col justify-start gap-y-4">
                  <div>
                    <span className="text-purpleDark">Bill To</span>
                    <h2>
                      <span className="font-bold text-xl">
                        {nameFixer(invoice?.clientName)}
                      </span>
                    </h2>
                  </div>
                  <div>
                    <p>{invoice.clientAddress.street}</p>
                    <p>{invoice.clientAddress.city}</p>
                    <p>{invoice.clientAddress.postCode}</p>
                    <p>{invoice.clientAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-purpleDark">Sent To</span>
              <h2>
                <span className="font-bold text-xl">
                  {invoice?.clientEmail}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="dark:bg-grayLow p-8 rounded-lg mt-8">
          {invoice.items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center w-full"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <span className="font-semibold text-sm">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-sm">
                  ${item.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <div className="dark:bg-slate-950 flex justify-between items-center mt-8 p-6 rounded-lg">
            <h2 className="font-semibold text-lg">Grand Total</h2>
            <span className="font-semibold text-sm">
              ${invoice.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceId;

import Image from "next/image";
import { formatData, nameFixer } from "@/utils/helper";
import useInvoices from "@/app/hooks/useInvoices";

const Invoice = () => {
  const { isLoading, data } = useInvoices();
  const invoices = data ?? [];
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

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

  return (
    <div className="md:min-w-[45rem] sm:min-w-[35rem] min-w-[24rem] h-[80%]">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="bg-background dark:bg-foreground invoice-shadow rounded-lg mb-6 px-8 py-6 items-center flex flex-col gap-y-4 md:flex-row justify-between gap-x-4 w-full dark:text-primary border border-transparent hover:border hover:border-purpleLight transition-all ease-in-out duration-300"
        >
          <h2 className="md:block hidden">
            <span className="text-purpleDark">#</span>
            <span className="font-semibold">{invoice.id}</span>
          </h2>
          <h2 className="md:block hidden">{formatData(invoice?.created_at)}</h2>
          <p className="md:block hidden">{invoice.clientName}</p>
          <h2 className="md:block hidden font-semibold text-lg">
            ${invoice.total.toFixed(2)}
          </h2>
          <div className="items-center md:flex hidden gap-x-3 ">
            {renderInvoiceStatus(invoice.status)}
            <Image
              src="/assets/icon-arrow-right.svg"
              width={12}
              height={12}
              alt="arrow"
              className="md:block hidden"
            />
          </div>

          <div className="items-center justify-between w-full flex md:hidden">
            <h2>
              <span className="text-purpleDark">#</span>
              <span className="font-semibold">{invoice.id}</span>
            </h2>
            <p>{invoice.clientName}</p>
          </div>
          <div className="items-center justify-between w-full flex md:hidden">
            <div className="items-start justify-center flex-col w-full flex md:hidden">
              <h2>{formatData(invoice?.created_at)}</h2>
              <h2 className="font-semibold text-lg">
                ${invoice.total.toFixed(2)}
              </h2>
            </div>
            <div className="md:hidden items-center gap-x-3 flex">
              {renderInvoiceStatus(invoice.status)}
              <Image
                src="/assets/icon-arrow-right.svg"
                width={12}
                height={12}
                alt="arrow"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invoice;

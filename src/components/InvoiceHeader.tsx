import Image from "next/image";
import { Button } from "./ui/button";

const InvoiceHeader = () => {
  return (
    <div className="md:min-w-[45rem] sm:min-w-[35rem] min-w-[24rem] my-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-primary text-4xl">Invoices</h2>
          <p className="text-sm text-secondary-foreground">
            Total are 7 total invoices
          </p>
        </div>
        <div>
          <p>Filter by status</p>
          <Button
            variant="none"
            className="bg-purpleDark text-[#fff] text-lg flex items-center justify-between gap-x-4 rounded-full py-[28px]"
          >
            <div className="bg-white rounded-full flex items-center justify-center p-3">
              <Image
                src="/assets/icon-plus.svg"
                width={12}
                height={12}
                alt="new-invoice"
              />
            </div>
            <h2>New Invoice</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;

import Image from "next/image";
import { Button } from "./ui/button";
import NewInvoice from "./NewInvoice";
import { DatePicker } from "./DatePicker";

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
          <NewInvoice />
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;

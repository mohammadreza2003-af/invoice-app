import NewInvoice from "./NewInvoice";
import FilterDropdown from "./FilterDropdown";
import useInvoices from "@/app/hooks/useInvoices";

const InvoiceHeader = () => {
  const { data, isLoading } = useInvoices();

  return (
    <div className="my-16 h-[20%] mt-28 scrollbar-hide">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-primary md:text-4xl text-xl">
            Invoices
          </h2>
          {!isLoading && (
            <p className="text-sm text-secondary-foreground">
              {`Total are ${data?.length} total invoices`}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <FilterDropdown />
          <NewInvoice />
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { fetchInvoicesByStatus, getAllInvoices } from "@/services/apiInvoice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const FilterDropdown = () => {
  const [statuses, setStatuses] = useState<string[]>([]);

  const fetchInvoices = async () => {
    if (statuses.length === 0) {
      return await getAllInvoices();
    }
    try {
      const invoices = await fetchInvoicesByStatus(statuses);
      return invoices;
    } catch (error: any) {
      console.error("Error fetching invoices:", error.message);
      return [];
    }
  };

  const { refetch } = useQuery({
    queryKey: ["Invoices"],
    queryFn: fetchInvoices,
  });

  useEffect(() => {
    refetch();
  }, [statuses, refetch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center">
          <Button variant="none" className="dark:text-white text-lg">
            Filter by status
          </Button>
          <Image
            src="/assets/icon-arrow-right.svg"
            width={12}
            height={12}
            alt="arrow"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-foreground">
        <DropdownMenuCheckboxItem
          checked={statuses.includes("pending")}
          onCheckedChange={(checked) => {
            setStatuses((prevStatuses) =>
              checked
                ? [...prevStatuses, "pending"]
                : prevStatuses.filter((status) => status !== "pending")
            );
          }}
        >
          pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statuses.includes("paid")}
          onCheckedChange={(checked) => {
            setStatuses((prevStatuses) =>
              checked
                ? [...prevStatuses, "paid"]
                : prevStatuses.filter((status) => status !== "paid")
            );
          }}
        >
          paid
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statuses.includes("draft")}
          onCheckedChange={(checked) => {
            setStatuses((prevStatuses) =>
              checked
                ? [...prevStatuses, "draft"]
                : prevStatuses.filter((status) => status !== "draft")
            );
          }}
        >
          draft
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;

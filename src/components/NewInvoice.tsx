import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { DatePicker } from "./DatePicker";
import { useState } from "react";

const NewInvoice = () => {
  const [date, setDate] = useState<Date>(() => new Date());
  const { register, handleSubmit } = useForm();
  return (
    <Sheet>
      <SheetTrigger>
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
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>New Invoice</SheetTitle>
        </SheetHeader>
        <h2 className="text-purpleDark">Bill From</h2>
        <div className="my-4">
          <Label
            htmlFor="senderStreetAddress"
            className="block text-sm font-medium mb-2 text-primary"
          >
            Street Address
          </Label>
          <Input
            type="text"
            {...register("senderStreetAddress")}
            required
            className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
          />
        </div>
        <div className="flex items-center gap-x-4 my-4">
          <div>
            <Label
              htmlFor="senderCity"
              className="block text-sm font-medium mb-2 text-primary"
            >
              City
            </Label>
            <Input
              type="text"
              {...register("senderCity")}
              required
              className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground text-primary "
            />
          </div>
          <div>
            <Label
              htmlFor="senderPostCode"
              className="block text-sm font-medium mb-2 text-primary"
            >
              Post Code
            </Label>
            <Input
              type="text"
              {...register("senderPostCode")}
              required
              className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
            />
          </div>
          <div>
            <Label
              htmlFor="senderCountry"
              className="block text-sm font-medium mb-2 text-primary"
            >
              Country
            </Label>
            <Input
              type="text"
              {...register("senderCountry")}
              required
              className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
            />
          </div>
        </div>
        <h2 className="text-purpleDark">Bill To</h2>
        <div className="my-4">
          <Label
            htmlFor="clientName"
            className="block text-sm font-medium mb-2 text-primary"
          >
            Client&apos;s Name
          </Label>
          <Input
            type="text"
            {...register("clientName")}
            required
            className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
          />
        </div>
        <div className="my-4">
          <Label
            htmlFor="clientEmail"
            className="block text-sm font-medium mb-2 text-primary"
          >
            Client&apos;s Email
          </Label>
          <Input
            type="text"
            {...register("clientEmail")}
            required
            className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
          />
        </div>

        <div className="my-4">
          <Label
            htmlFor="clientStreetAddress"
            className="block text-sm font-medium mb-2 text-primary"
          >
            Street Address
          </Label>
          <Input
            type="text"
            {...register("clientStreetAddress")}
            required
            className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
          />
        </div>
        <div className="flex items-center gap-x-4 my-4">
          <div>
            <Label
              htmlFor="clientCity"
              className="block text-sm font-medium mb-2 text-primary"
            >
              City
            </Label>
            <Input
              type="text"
              {...register("clientCity")}
              required
              className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground text-primary "
            />
          </div>
          <div>
            <Label
              htmlFor="clientPostCode"
              className="block text-sm font-medium mb-2 text-primary"
            >
              Post Code
            </Label>
            <Input
              type="text"
              {...register("clientPostCode")}
              required
              className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
            />
          </div>
          <div>
            <Label
              htmlFor="clientCountry"
              className="block text-sm font-medium mb-2 text-primary"
            >
              Country
            </Label>
            <Input
              type="text"
              {...register("clientCountry")}
              required
              className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="invoiceDate"
            className="block text-sm font-medium mb-2 text-primary"
          >
            Invoice Date
          </Label>
          <DatePicker setDate={setDate} date={date} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewInvoice;

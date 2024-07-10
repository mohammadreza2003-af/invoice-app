import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "./DatePicker";
import { useEffect, useState } from "react";
import { InvoiceType, ItemType, newInvoiceType } from "@/constant/types";
import { newInvoiceSchema } from "@/utils/helper";
import InputField from "./InputField";
import SelectPayment from "./SelectPayment";
import { Input } from "./ui/input";
import useNewInvoice from "@/app/hooks/useNewInvoice";

const NewInvoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>(() => new Date());
  const [paymentTerms, setPaymentTerms] = useState<string>("1");
  const [status, setStatus] = useState<"pending" | "draft" | "paid">("pending");
  const [items, setItems] = useState<ItemType[]>([
    {
      id: 1,
      name: "",
      price: 0,
      total: 0,
      quantity: 1,
    },
  ]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newInvoiceSchema),
  });

  const { createNewInvouce } = useNewInvoice();

  const cancle = () => {
    setDate(new Date());
    setPaymentTerms("1");
    setItems([
      {
        id: 1,
        name: "",
        price: 0,
        total: 0,
        quantity: 1,
      },
    ]);
    setStatus("pending");
    reset();
  };

  useEffect(() => {
    cancle();
  }, [isOpen]);

  const onSubmit: SubmitHandler<newInvoiceType> = (data) => {
    const formattedData: InvoiceType = {
      created_at: new Date(date).toISOString(),
      paymentDue: new Date().toISOString(),
      description: data.projectDescription,
      paymentTerms: parseInt(paymentTerms),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: status,
      senderAddress: {
        street: data.senderStreetAddress,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
      clientAddress: {
        street: data.clientStreetAddress,
        city: data.clientCity,
        postCode: data.clientPostCode,
        country: data.clientCountry,
      },
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
    };
    createNewInvouce(formattedData, {
      onSuccess: () => {
        cancle();
      },
    });
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, name: "", price: 0, total: 0, quantity: 1 },
    ]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.total = updatedItem.price * updatedItem.quantity;
        return updatedItem;
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger>
        <div
          className="bg-purpleDark text-[#fff] text-lg flex items-center justify-between gap-x-4 rounded-full py-3 px-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bg-white rounded-full flex items-center justify-center p-3">
            <Image
              src="/assets/icon-plus.svg"
              width={12}
              height={12}
              alt="new-invoice"
            />
          </div>
          <h2 className="md:block hidden">New Invoice</h2>
          <h2 className="md:hidden">New</h2>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-auto dark:text-white">
        <SheetHeader>
          <SheetTitle className="text-white">New Invoice</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-purpleDark mb-4">Bill From</h2>
          <div className="mb-8">
            <InputField
              type="text"
              errors={errors}
              label="Street Address"
              register={register}
              registerName="senderStreetAddress"
            />
          </div>
          <div className="flex md:items-center items-start gap-y-8 w-full md:flex-row flex-col gap-x-4 my-8">
            <InputField
              type="text"
              errors={errors}
              label="City"
              register={register}
              registerName="senderCity"
            />
            <InputField
              type="text"
              errors={errors}
              label="Post Code"
              register={register}
              registerName="senderPostCode"
            />
            <InputField
              type="text"
              errors={errors}
              label="Country"
              register={register}
              registerName="senderCountry"
            />
          </div>
          <h2 className="text-purpleDark">Bill To</h2>
          <div className="flex md:items-center items-start gap-y-12 w-full flex-col my-8">
            <InputField
              type="text"
              errors={errors}
              label="Client's Name"
              register={register}
              registerName="clientName"
            />
            <InputField
              type="text"
              errors={errors}
              label="Client's Email"
              register={register}
              registerName="clientEmail"
            />
            <InputField
              type="text"
              errors={errors}
              label="Street Address"
              register={register}
              registerName="clientStreetAddress"
            />
          </div>
          <div className="flex md:items-center items-start gap-y-8 w-full md:flex-row flex-col gap-x-4 my-8">
            <InputField
              type="text"
              errors={errors}
              label="City"
              register={register}
              registerName="clientCity"
            />
            <InputField
              type="text"
              errors={errors}
              label="Post Code"
              register={register}
              registerName="clientPostCode"
            />
            <InputField
              type="text"
              errors={errors}
              label="Country"
              register={register}
              registerName="clientCountry"
            />
          </div>
          <div>
            <Label
              htmlFor="createdAt"
              className="block text-sm font-medium mb-2 text-primary"
            >
              Invoice Date
            </Label>
            <Controller
              control={control}
              name="createdAt"
              render={({ field }) => (
                <DatePicker {...field} setDate={setDate} date={date} />
              )}
            />
          </div>
          <SelectPayment
            errors={errors}
            htmlFor="paymentTerms"
            label="Payment Terms"
            paymentTerms={paymentTerms}
            setPaymentTerms={setPaymentTerms}
          />
          <div className="my-8">
            <InputField
              type="text"
              errors={errors}
              label="Project Description"
              register={register}
              registerName="projectDescription"
            />
          </div>
          <h2 className="text-xl font-semibold my-4">Item List</h2>
          <div className="flex flex-col items-center justify-center gap-y-20 mb-16">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-center gap-x-4 w-full"
              >
                <div className="flex flex-col items-start justify-center relative">
                  <Label
                    htmlFor={`items[${index}].name`}
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Item Name
                  </Label>
                  <Input
                    type="text"
                    {...register(`items.${index}.name`)}
                    className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground text-primary "
                    onChange={(e) => updateItem(index, "name", e.target.value)}
                  />
                  {errors.items?.[index]?.name && (
                    <p className="text-red-500  text-sm mt-2 absolute text-center md:-bottom-8 -bottom-12">
                      {errors.items[index].name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center relative">
                  <Label
                    htmlFor={`items[${index}].quantity`}
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Qty.
                  </Label>
                  <Input
                    type="number"
                    {...register(`items.${index}.quantity`)}
                    min={1}
                    className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
                    onChange={(e) =>
                      updateItem(index, "quantity", parseInt(e.target.value))
                    }
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-red-500  text-sm mt-2 absolute text-center md:-bottom-8 -bottom-12">
                      {errors.items[index].quantity.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center relative">
                  <Label
                    htmlFor={`items[${index}].price`}
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Price
                  </Label>
                  <Input
                    type="number"
                    {...register(`items.${index}.price`)}
                    min={1}
                    className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
                    onChange={(e) =>
                      updateItem(index, "price", parseFloat(e.target.value))
                    }
                  />
                  {errors.items?.[index]?.price && (
                    <p className="text-red-500  mt-2 text-sm absolute text-center md:-bottom-8 -bottom-12">
                      {errors.items[index].price.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center relative">
                  <Label
                    htmlFor={`items.${index}.total`}
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Total
                  </Label>
                  <Input
                    type="number"
                    disabled={true}
                    {...register(`items.${index}.total`)}
                    min={1}
                    value={item.total}
                    className="block w-full px-3 py-2 mt-1 bg-background dark:bg-foreground"
                  />
                  {errors.items?.[index]?.total && (
                    <p className="text-red-500  text-sm mt-2 absolute text-center md:-bottom-8 -bottom-12">
                      {errors.items[index].total.message}
                    </p>
                  )}
                </div>
                {items.length > 1 && (
                  <Image
                    src="/assets/icon-delete.svg"
                    alt="icon-delete"
                    className="ml-4 h-full"
                    width={24}
                    height={24}
                    onClick={() =>
                      setItems(items.filter((_, i) => i !== index))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            className="w-full dark:bg-foreground dark:text-white bg-slate-200 hover:bg-slate-300 text-foreground mt-6 rounded-full"
            onClick={addItem}
          >
            Add Item
          </Button>
          <div className="flex dark:bg-background w-full justify-between md:justify-end gap-x-4 items-center py-8">
            <Button
              type="button"
              onClick={() => {
                cancle();
                setIsOpen(!isOpen);
              }}
              className="dark:bg-foreground dark:text-white bg-slate-200 hover:bg-slate-300 text-foreground rounded-full"
            >
              Discard
            </Button>
            <Button
              onClick={() => setStatus("draft")}
              type="submit"
              className="dark:bg-foreground dark:text-white bg-slate-200 hover:bg-slate-300 text-foreground rounded-full"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              onClick={() => setStatus("pending")}
              className="dark:bg-foreground dark:text-white dark:bg-purpleDark bg-purpleDark hover:bg-purpleLight hover:dark:bg-purpleLight text-foreground rounded-full"
            >
              Save & Send
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default NewInvoice;
import { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectPayment = ({
  errors,
  setPaymentTerms,
  htmlFor,
  label,
  paymentTerms,
}: {
  htmlFor: string;
  errors: any;
  setPaymentTerms: Dispatch<SetStateAction<string>>;
  label: string;
  paymentTerms: string;
}) => {
  return (
    <div className="mt-4">
      <Label
        htmlFor={htmlFor}
        className="block text-sm font-medium mb-2 text-primary"
      >
        {label}
      </Label>
      <Select onValueChange={setPaymentTerms} value={paymentTerms}>
        <SelectTrigger className="w-full dark:bg-foreground dark:text-white">
          <SelectValue placeholder="Payment" />
        </SelectTrigger>
        <SelectContent className="dark:bg-foreground">
          <SelectItem value="1">Net 1 Day</SelectItem>
          <SelectItem value="7">Net 7 Day</SelectItem>
          <SelectItem value="14">Net 14 Day</SelectItem>
          <SelectItem value="30">Net 30 Day</SelectItem>
        </SelectContent>
      </Select>
      {errors.paymentTerms && (
        <p className="text-red-500">{errors.paymentTerms.message}</p>
      )}
    </div>
  );
};

export default SelectPayment;

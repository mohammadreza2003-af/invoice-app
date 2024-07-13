import { toast } from "@/components/ui/use-toast";
import * as yup from "yup";

export const showToast = (title: string, description: string) => {
  toast({
    title: title,
    description: description,
    duration: 2000,
    className: "bg-background text-primary",
  });
};

export const formatDate = (d: string) => {
  const date = new Date(d);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `Due ${day} ${month} ${year}`;
};

export const nameFixer = (name: string) => {
  const temp = name[0].toUpperCase();
  return temp + name.slice(1);
};

export const calculatePaymentDue = (createdAt: Date, paymentTerms: number) => {
  const createdDate = new Date(createdAt);
  createdDate.setDate(createdDate.getDate() + paymentTerms);
  console.log(createdDate, "create Date");
  return createdDate.toISOString();
};

export const newInvoiceSchema = yup.object().shape({
  senderStreetAddress: yup.string().required("Street Address is required"),
  senderCity: yup.string().required("City is required"),
  senderPostCode: yup.string().required("Post Code is required"),
  senderCountry: yup.string().required("Country is required"),
  clientName: yup.string().required("Client's Name is required"),
  paymentTerms: yup.string(),
  clientEmail: yup
    .string()
    .email("Invalid email")
    .required("Client's Email is required"),
  clientStreetAddress: yup.string().required("Street Address is required"),
  clientCity: yup.string().required("City is required"),
  clientPostCode: yup.string().required("Post Code is required"),
  clientCountry: yup.string().required("Country is required"),
  createdAt: yup.date().required("Invoice Date is required"),
  projectDescription: yup.string().required("Project Description is required"),
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Item name is required"),
        quantity: yup
          .number()
          .typeError("Qty must be a number")
          .required("Qty is required")
          .min(1, "Qty must be at least 1"),
        price: yup
          .number()
          .typeError("Price must be a number")
          .required("Price is required")
          .min(0, "Price must be at least 0"),
        total: yup
          .number()
          .typeError("Total must be a number")
          .min(0, "Total must be at least 0"),
      })
    )
    .required("Items are required"),
});

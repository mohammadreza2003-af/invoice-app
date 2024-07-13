export type SignUpSubmitFrom = {
  email: string;
  password: string;
  fullName: string;
  confirmPassword?: string;
};

export type LoginSubmitFrom = {
  email: string;
  password: string;
};

export type InvoiceType = {
  user_id: string;
  id?: string;
  created_at: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: AddressType;
  clientAddress: AddressType;
  items: ItemType[];
  total: number;
};

export type AddressType = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type ItemType = {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type NewInvoiceFormData = {
  id?: string;
  created_at: string;
  paymentDue: string;
  projectDescription: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  senderCity: string;
  senderCountry: string;
  senderPostCode: string;
  senderStreetAddress: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  status: "paid" | "pending" | "draft";
  senderAddress: AddressType;
  clientAddress: AddressType;
  items: ItemType[];
  total: number;
};
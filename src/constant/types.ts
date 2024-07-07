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
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
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
  name: string;
  quantity: number;
  price: number;
  total: number;
};
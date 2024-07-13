import { InvoiceType } from "@/constant/types";
import { createClient } from "@/utils/supabase/client";

export const getAllInvoices = async () => {
  try {
    const res = await fetch("/api/getAllInovices");
    if (!res.ok) {
      throw new Error("Fetching error");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const newInvoice = async (invoice: InvoiceType, id?: number) => {
  try {
    const api = id ? "/api/editInvoice" : "/api/newInvoice";
    const res = await fetch(api, {
      body: JSON.stringify(invoice),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Fetching error");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getInvoiceById = async (id: number) => {
  try {
    const res = await fetch("/api/getInvoiceById", {
      body: JSON.stringify({ id }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Fetching error");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteInvoice = async (id: number) => {
  try {
    const res = await fetch("/api/deleteInvoice", {
      body: JSON.stringify({ id }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Fetching error");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export async function fetchInvoicesByStatus(statuses: string[]) {
  const supabase = createClient();

  try {
    const { data: invoices, error } = await supabase
      .from("invoices")
      .select("*")
      .in("status", statuses);
    if (error) {
      throw error;
    }
    return invoices;
  } catch (error: any) {
    console.error("Error fetching invoices:", error.message);
    throw error;
  }
}

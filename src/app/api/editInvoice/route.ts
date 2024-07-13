import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const newInvoice = await request.json();
  const supabase = createClient();
  const { error } = await supabase
    .from("invoices")
    .update({ ...newInvoice })
    .eq("id", newInvoice.id)
    .select();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ message: "Invoice edited" }, { status: 200 });
}

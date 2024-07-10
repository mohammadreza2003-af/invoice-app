import { createClient } from "@/utils/supabase/server";

export async function POST(resquet: Request) {
  const { id } = await resquet.json();
  const supabase = createClient();
  let { data: invoices, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", 1);
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json(invoices);
}

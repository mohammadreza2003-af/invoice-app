import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient();
  let { data: invoices, error } = await supabase.from("invoices").select("*");
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json(invoices);
}

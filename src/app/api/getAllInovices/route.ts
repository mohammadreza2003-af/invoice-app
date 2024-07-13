import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: user_info } = await supabase.auth.getUser();
  let { data: invoices, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", user_info?.user?.id);
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json(invoices);
}

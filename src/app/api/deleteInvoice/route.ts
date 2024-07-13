import { createClient } from "@/utils/supabase/server";

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const supabase = createClient();

  const { error, status } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ message: "Invoice deleted" }), {
    status: 200,
  });
}

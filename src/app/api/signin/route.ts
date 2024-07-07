import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  return Response.json({ message: "Login successful" }, { status: 200 });
}

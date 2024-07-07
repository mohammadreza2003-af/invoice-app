import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { email, password, fullName } = await request.json();
  const supabase = createClient();

  const data = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }

  return Response.json({ message: "Signup successful" }, { status: 200 });
}

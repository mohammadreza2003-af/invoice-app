import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(
    { message: "Password reset email sent" },
    { status: 200 }
  );
}

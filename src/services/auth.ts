import { LoginSubmitFrom, SignUpSubmitFrom } from "@/constant/types";
import { createClient } from "@/utils/supabase/client";

const checkUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return null;
  }
  return data.user;
};

const signup = async (info: SignUpSubmitFrom) => {
  try {
    const res = await fetch("/api/signup", {
      body: JSON.stringify(info),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "An error occurred while signup.");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
};

const login = async (info: LoginSubmitFrom) => {
  try {
    const res = await fetch("/api/signin", {
      body: JSON.stringify(info),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "An error occurred while signing in."
      );
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
};

const signout = async () => {
  const res = fetch("/api/signout", {
    method: "POST",
  });
  const data = await res;
  return data;
};

const forgotpassword = async (email: string) => {
  try {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "An error occurred.");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
};

export { signup, login, signout, forgotpassword, checkUser };

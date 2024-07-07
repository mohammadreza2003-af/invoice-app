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
  console.log("info", info);
  const res = await fetch("/api/signup", {
    body: JSON.stringify(info),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const login = async (info: LoginSubmitFrom) => {
  const res = await fetch("/api/signin", {
    body: JSON.stringify(info),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const signout = async () => {
  const res = fetch("/api/signout", {
    method: "POST",
  });
  const data = await res;
  return data;
};

const forgotpassword = async (email: string) => {
  const response = await fetch("/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return data;
};

export { signup, login, signout, forgotpassword, checkUser };

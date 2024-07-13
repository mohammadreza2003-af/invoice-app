// hooks/useAuth.ts
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const path = usePathname();
  const supabase = createClient();
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLogin(!!session?.user);
    };

    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLogin(!!session?.user);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [path]);

  return { isLogin };
};

export default useAuth;

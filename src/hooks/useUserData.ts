import { checkUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: checkUser,
  });
};

export default useUserData;

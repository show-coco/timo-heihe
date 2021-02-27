import { useRouter } from "next/router";
import { useAuthContext } from "../providers/useAuthContext";

export const useAuthGuard = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    router.push("/login");
  }
};

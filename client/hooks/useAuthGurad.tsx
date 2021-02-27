import { useRouter } from "next/router";
import { useAuthContext } from "../providers/useAuthContext";

type Props = {
  ownerId?: number;
};

export const useAuthGuard = ({ ownerId }: Props) => {
  const router = useRouter();
  const userId = router.query.id;
  const { isAuthenticated, id, userId: loginUserId } = useAuthContext();

  if (ownerId && ownerId !== id) {
    router.push("/");
  }

  if (userId !== loginUserId) {
    router.push("/");
  }

  if (!isAuthenticated) {
    router.push("/login");
  }
};

import { useRouter } from "next/router";
import { useAuthContext } from "../providers/useAuthContext";

type Props = {
  ownerId?: number;
  isMe?: boolean;
};

export const useAuthGuard = ({ ownerId, isMe }: Props) => {
  const router = useRouter();
  const userId = router.query.id;
  const {
    isAuthenticated,
    id,
    userId: loginUserId,
    loading,
  } = useAuthContext();

  if (typeof window !== "undefined") {
    if (ownerId && ownerId !== id) {
      router.push("/");
    }

    if (isMe && userId !== loginUserId) {
      router.push("/");
    }

    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }
};

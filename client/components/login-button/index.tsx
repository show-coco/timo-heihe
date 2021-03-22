import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

export const LoginButton: React.FC<Props> = ({ className }: Props) => {
  return (
    <Link href="http://localhost:8080/google">
      <button
        className={`px-3 py-1 text-white align-middle rounded-md shadow-sm bg-gradient-to-r from-orange-400 to-orange-350 hover:from-orange-600 hover:to-orange-350 ${className}`}
      >
        Googleでログイン
      </button>
    </Link>
  );
};

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type LinkObject = {
  name: string;
  path: string;
};

type Props = {
  links: LinkObject[];
};

export const Tab: React.FC<Props> = ({ links }: Props) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <div className="flex flex-row font-bold bg-white rounded-md text-orange-primary w-max">
      {links.map((link) => (
        <Link href={link.path} key={link.name}>
          <a
            className={`px-5 py-2 inline-block rounded-md ${
              path === link.path && "bg-purple-150"
            }`}
          >
            {link.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

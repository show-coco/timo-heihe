import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div className="mt-10 text-center">
      <h1 className="mb-10">404 - Page Not Found</h1>
      <Link href="/">
        <a className="px-3 py-2 border border-gray-100 rounded-md shadow-sm hover:bg-orange-50">
          トップページへ戻る
        </a>
      </Link>
    </div>
  );
}

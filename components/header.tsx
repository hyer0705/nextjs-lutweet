"use client";

import { useRouter } from "next/navigation";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="pb-8 flex items-center">
      <span className="p-4 cursor-pointer" onClick={() => router.back()}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          ></path>
        </svg>
      </span>
      <h1 className="flex-1 text-center text-3xl font-extrabold">{title}</h1>
    </div>
  );
}

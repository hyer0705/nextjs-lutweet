"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRequestApi } from "../hooks/useRequestApi";
import { IResponseData } from "../types/Response";

export default function HomePage() {
  const router = useRouter();

  const { data, handleApi } = useRequestApi<IResponseData>({
    url: "/api/users/check",
    method: "GET",
  });

  useEffect(() => {
    handleApi();
    if (!data) return;
    if (!data.ok) {
      router.push("/create-account");
    }
  }, [data, router]);

  return (
    <div>
      <h1 className="text-7xl">Hello, World</h1>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const checkResData = await (await fetch(`/api/users/check`)).json();
      console.log(checkResData);
      if (!checkResData.ok) {
        router.push("/create-account");
      }
    })();
  }, [router]);

  return (
    <div>
      <h1 className="text-7xl">Hello, World</h1>
    </div>
  );
}

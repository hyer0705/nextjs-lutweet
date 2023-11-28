"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error, isValidating } = useSWR("/api/users/check");
  const isLoading = (!data && !error) || isValidating;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data && !data.ok) {
      router.replace("/create-account");
    }
  }, [isLoading, data, router]);

  return { user: data?.user, isLoading };
}

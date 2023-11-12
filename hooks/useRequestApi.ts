"use client";

import { useState } from "react";

export const useRequestApi = <T>({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();

  const handleApi = async (data?: any) => {
    setIsLoading(true);

    try {
      const resp = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      setData(resp);

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  return { handleApi, data, error, isLoading };
};

"use client";

import { useState } from "react";

interface UseRequestApiState<T> {
  isLoading: boolean;
  data?: T;
  error?: object;
}

type UseRequestApiResult<T> = [(data: any) => void, UseRequestApiState<T>];

export const useRequestApi = <T = any>({
  url,
}: {
  url: string;
}): UseRequestApiResult<T> => {
  const [state, setState] = useState<UseRequestApiState<T>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  const handleApi = (data?: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    })
      .then((res) =>
        res.json().catch((err) => {
          console.log(err);
        })
      )
      .then((data) => setState((prev) => ({ ...prev, data, isLoading: false })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
  };
  return [handleApi, { ...state }];
};

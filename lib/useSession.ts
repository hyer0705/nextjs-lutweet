import useSWR from "swr";
import { SessionData, defaultSession } from "./session";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

function doLogin(url: string, { arg }: { arg: string }) {
  console.log("===== doLogin - arg: ", arg);
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ email: arg }),
  });
}

function doLogout(url: string) {
  console.log("===== doLogout - url: ", url);
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}

export default function useSession() {
  const router = useRouter();

  const { data: session, isLoading } = useSWR(
    "/api/users/check",
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
    }
  );

  const { trigger: login } = useSWRMutation("/api/users/log-in", doLogin, {
    revalidate: false,
    onSuccess: (data) => {
      console.log("===== login onSuccess - data: ", data);
      if (data.isLoggedIn) {
        router.replace("/");
      }
    },
  });

  const { trigger: logout } = useSWRMutation("/api/users/log-out", doLogout, {
    onSuccess: (data) => {
      if (!data.isLoggedIn) {
        router.replace("/log-in");
      }
    },
  });

  return { session, logout, login, isLoading };
}

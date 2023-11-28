import { getIronSession } from "iron-session";
import HomePage from "./home-page";
import { SessionData, sessionOptions } from "../lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

export default async function Page() {
  const session = await getUserSession();

  if (!session.isLoggedIn) {
    redirect("/create-account");
  }

  return <HomePage user={session.user} />;
}

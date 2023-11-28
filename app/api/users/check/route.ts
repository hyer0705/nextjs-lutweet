import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  defaultSession,
  sessionOptions,
  SessionData,
} from "../../../../lib/session";

export async function GET(request: Request, response: Response) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.json(
      { ok: false, user: defaultSession },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      isLoggedIn: session.isLoggedIn,
      user: session.user,
    },
    { status: 200 }
  );
}

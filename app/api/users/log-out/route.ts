import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "../../../../lib/session";

export async function DELETE(request: Request) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  await session.destroy();
  return NextResponse.json(
    {
      ok: true,
      isLoggedIn: defaultSession.isLoggedIn,
      user: defaultSession.user,
    },
    { status: 200 }
  );
}

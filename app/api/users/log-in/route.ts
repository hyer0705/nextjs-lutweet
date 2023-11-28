import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../../../../lib/session";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. select user
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return NextResponse.json({ ok: false, status: 401 });

    // 2. save session
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );
    session.isLoggedIn = true;
    session.user = {
      email: user.email,
      name: user.name,
    };
    await session.save();

    return NextResponse.json(
      { ok: true, isLoggedIn: session.isLoggedIn, user: session.user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

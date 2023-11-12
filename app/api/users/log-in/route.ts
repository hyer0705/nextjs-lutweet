import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getSession } from "../../../../lib/session";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. select user
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user?.email) return NextResponse.json({ ok: false, status: 401 });

    // 2. save session
    const response = new Response();
    const session = await getSession(request, response);
    session.user = {
      email: user.email || "",
      name: user.name,
    };
    await session.save();

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

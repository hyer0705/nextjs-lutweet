import db from "../../../lib/db";
import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";

export async function GET(request: Request, response: Response) {
  try {
    // get user
    const session = await getSession(request, response);
    const user = session.user;

    if (!user)
      return NextResponse.json({ ok: false, tweets: null }, { status: 401 });

    // get tweet list
    const tweets = await db.tweet.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            hearts: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ ok: true, tweets }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

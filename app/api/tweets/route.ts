import db from "../../../lib/db";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../../../lib/session";

export async function GET(request: Request, response: Response) {
  try {
    // get user
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );
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

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    // 1. get user by session
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );
    const user = session.user;

    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    // 2. create tweet
    const tweet = await db.tweet.create({
      data: {
        content,
        user: {
          connect: {
            email: user.email,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, tweet }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

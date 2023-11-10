import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { getSession } from "../../../../lib/session";

export async function POST(request: Request, response: Response) {
  try {
    const { content } = await request.json();

    // 1. get user by session
    const session = await getSession(request, response);
    const user = session.user;

    /**
     * To Do middleware에서도 할 방법이 있는지 확인
     */
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
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

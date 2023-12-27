import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "../../../../lib/session";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { user } = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    // select tweet
    const tweet = await db.tweet.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // select heart
    const isLiked = Boolean(
      await db.heart.findFirst({
        where: {
          tweetId: +id,
          user: {
            email: user?.email,
          },
        },
        select: {
          id: true,
        },
      })
    );

    return NextResponse.json(
      { ok: true, tweetDetail: tweet, isLiked },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

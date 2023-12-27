import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "../../../../../lib/session";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // select heart count
    const heartCnt = await db.tweet.findUnique({
      where: {
        id: +id,
      },
      select: {
        _count: {
          select: { hearts: true },
        },
      },
    });

    // select heart
    const isLiked = Boolean(
      await db.heart.findFirst({
        where: {
          tweetId: +id,
        },
        select: {
          id: true,
        },
      })
    );

    return NextResponse.json(
      { ok: true, isLiked, heartCnt: heartCnt._count.hearts },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // get user
    const { user } = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const isExist = await db.heart.findFirst({
      where: {
        AND: {
          tweetId: +id,
          user: {
            email: user.email,
          },
        },
      },
    });

    if (isExist) {
      await db.heart.delete({
        where: {
          id: isExist.id,
        },
      });
    }
    if (!isExist) {
      await db.heart.create({
        data: {
          user: {
            connect: {
              email: user.email,
            },
          },
          tweet: {
            connect: {
              id: +id,
            },
          },
        },
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

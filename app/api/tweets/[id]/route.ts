import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  console.log("===== /api/tweets/[id]");
  console.log(id);
  try {
    // select tweet
    const tweet = await db.tweet.findUnique({
      where: {
        id: +id,
      },
      include: {
        _count: {
          select: { hearts: true },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    console.log(tweet);

    return NextResponse.json({ ok: true, tweetDetail: tweet }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

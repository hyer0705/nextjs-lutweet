import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import { getSession } from "../../../../../lib/session";

export async function POST(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  console.log("===== /api/tweets/[id]/heart");

  try {
    // get user
    const response = new Response();
    const { user } = await getSession(request, response);

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

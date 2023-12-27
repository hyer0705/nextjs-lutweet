import { getIronSession } from "iron-session";
import Header from "../../../components/header";
import TweetProfile from "../../../components/tweet-profile";
import dateFormat from "../../../lib/date-format";
import { SessionData, sessionOptions } from "../../../lib/session";
import { cookies } from "next/headers";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import HeartButton from "../../../components/tweets/heart-button";

async function getTweet({ id }: { id: string }) {
  try {
    const { user, isLoggedIn } = await getIronSession<SessionData>(
      cookies(),
      sessionOptions
    );

    if (!isLoggedIn) {
      return { ok: false };
    }

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

    // select heart
    const isLiked = Boolean(
      await db.heart.findFirst({
        where: {
          tweetId: +id,
          user: {
            email: user.email,
          },
        },
        select: {
          id: true,
        },
      })
    );

    return { ok: true, tweet, isLiked };
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getTweet({ id });

  if (!data.ok) {
    redirect("/log-in");
  }

  return (
    <div className="space-y-4 text-white">
      <Header title="Post" />

      <TweetProfile
        name={data?.tweet.user.name}
        email={data?.tweet.user.email}
      />
      <div className="pb-4 border-b-2">
        <p>{data?.tweet.content}</p>
      </div>
      <div className="flex items-center">
        <span className="flex-1 text-gray-600 text-sm font-semibold">
          {data && dateFormat(data?.tweet.createdAt)}
        </span>
        <HeartButton id={id} />
      </div>
    </div>
  );
}

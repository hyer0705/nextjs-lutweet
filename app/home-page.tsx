"use client";

import React, { useEffect } from "react";
import { IResponseTweets } from "../types/Response";
import Logo from "../assets/Lutweet.svg";
import TweetPost from "../components/tweet-post";
import TweetProfile from "../components/tweet-profile";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import useSession from "../lib/useSession";
import { defaultSession } from "../lib/session";

export default function HomePage() {
  const router = useRouter();
  const { session, isLoading: isSessionLoading, logout } = useSession();

  const { data, isLoading } = useSWR<IResponseTweets>("/api/tweets");

  const onLogoutClick = (ev) => {
    ev.preventDefault();
    logout(null, {
      optimisticData: defaultSession,
    });
  };

  if (!isSessionLoading && !session?.ok) {
    router.replace("/create-account");
  }

  if (isLoading && isSessionLoading) return <div />;

  return (
    <div className="text-white">
      <div className="flex items-center justify-around">
        <Logo className="w-48 h-24" />

        <div className="flex flex-col justify-center items-center">
          <span>Hi! {session?.user?.name}</span>
          <button
            onClick={onLogoutClick}
            className="py-2 px-4 text-sm text-gray-600 font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="mt-4 p-4 flex flex-col space-y-4 bg-gray-800 rounded-md">
          {data?.tweets?.map((tweet) => (
            <div
              key={tweet.id}
              className="w-full p-3 flex flex-col space-y-4 bg-gray-900 rounded-md"
            >
              <TweetProfile {...tweet.user} />
              <TweetPost {...tweet} />
            </div>
          ))}
        </div>
        <div className="fixed bottom-4 right-4 inline-block p-3 bg-blue-600 rounded-full cursor-pointer">
          <Link href="/tweet/write">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

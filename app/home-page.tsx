"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRequestApi } from "../hooks/useRequestApi";
import { IResponseUserData } from "../types/Response";
import Logo from "../assets/Lutweet.svg";
import TweetPost from "../components/tweet-post";
import TweetProfile from "../components/tweet-profile";

export default function HomePage() {
  const router = useRouter();

  const { data, handleApi, isLoading } = useRequestApi<IResponseUserData>({
    url: "/api/users/check",
    method: "GET",
  });

  useEffect(() => {
    handleApi();
    if (!data) return;
    if (!data.ok) {
      router.push("/create-account");
    }
  }, [router]);

  return (
    <div className="text-white">
      <div className="flex items-center justify-between">
        <Logo className="w-28 h-14" />
        <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
      </div>
      {isLoading ? (
        <h1 className="text-white text-3xl">Loading...</h1>
      ) : (
        <div className="mt-4 p-4 flex flex-col space-y-4 bg-gray-800 rounded-md">
          {Array.from({ length: 10 }, (x) => 0).map((_, i) => (
            <div
              key={i}
              className="w-full p-3 flex flex-col space-y-4 bg-gray-900 rounded-md"
            >
              <TweetProfile {...data?.user} />
              <TweetPost tweetId={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

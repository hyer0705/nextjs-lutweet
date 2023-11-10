"use client";

import TweetProfile from "../../../components/tweet-profile";
import Header from "../../../components/header";
import useSWR from "swr";
import { IResponseTweetDetail } from "../../../types/Response";
import dateFormat from "../../../lib/dateFormat";

export default function DetailPage({ id }: { id: string }) {
  const { data, isLoading } = useSWR<IResponseTweetDetail>(
    id ? `/api/tweets/${id}` : null
  );

  return (
    <div className="space-y-4 text-white">
      <Header title="Post" />
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <TweetProfile
            name={data?.tweetDetail.user.name}
            email={data?.tweetDetail.user.email}
          />
          <div className="pb-4 border-b-2">
            <p>{data?.tweetDetail.content}</p>
          </div>
          <div className="flex items-center">
            <span className="flex-1 text-gray-600 text-sm font-semibold">
              {/* HH:mm 10.11.2023 */}
              {data && dateFormat(data?.tweetDetail.createdAt)}
            </span>
            <div className="flex space-x-2">
              <svg
                className="w-6 cursor-pointer"
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
              </svg>
              <span>{data?.tweetDetail._count.hearts}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

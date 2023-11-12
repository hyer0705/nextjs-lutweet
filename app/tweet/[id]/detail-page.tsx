"use client";

import TweetProfile from "../../../components/tweet-profile";
import Header from "../../../components/header";
import useSWR from "swr";
import { IResponseTweetDetail } from "../../../types/Response";
import dateFormat from "../../../lib/dateFormat";
import { useRequestApi } from "../../../hooks/useRequestApi";

export default function DetailPage({ id }: { id: string }) {
  const { handleApi } = useRequestApi({
    url: `/api/tweets/${id}/heart`,
    method: "POST",
  });

  const { data, isLoading, mutate } = useSWR<IResponseTweetDetail>(
    id ? `/api/tweets/${id}` : null
  );

  const onHeartClick = () => {
    mutate(
      (curr) => {
        if (curr) {
          const increment = curr.isLiked ? -1 : 1;
          return {
            ...curr,
            isLiked: !curr?.isLiked,
            tweetDetail: {
              ...curr.tweetDetail,
              _count: {
                hearts: curr.tweetDetail._count.hearts + increment,
              },
            },
          };
        }
      },
      { revalidate: false }
    );
    handleApi();
  };

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
              <button className="cursor-pointer" onClick={onHeartClick}>
                {data?.isLiked ? (
                  <svg
                    className="w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6"
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
                )}
              </button>
              <span>{data?.tweetDetail._count.hearts}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

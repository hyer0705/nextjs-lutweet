"use client";

import TweetProfile from "../../../components/tweet-profile";
import Header from "../../../components/header";

export default function DetailPage() {
  return (
    <div className="space-y-4 text-white">
      <Header title="Post" />
      <TweetProfile name="test user name" email="test user email" />
      <div className="pb-4 border-b-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris erat
          risus, tincidunt sit amet tincidunt vel, blandit eget neque. Mauris
          vitae ultrices massa. Curabitur feugiat in augue volutpat rhoncus.
          Proin in ultricies odio, faucibus facilisis lectus. Etiam imperdiet
          euismod quam, eget mollis eros maximus a. Sed quis erat pretium,
          placerat ante vel, scelerisque tellus. Nam sagittis mattis neque, eget
          dapibus elit. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Nam nec sagittis augue, sed
          sodales neque. Vivamus auctor dui est, ut tristique ligula
          pellentesque laoreet. Nam pretium egestas tellus, maximus laoreet leo
          scelerisque eu. Quisque sed nibh non metus volutpat feugiat.
        </p>
      </div>
      <div className="flex items-center">
        <span className="flex-1 text-gray-600 text-sm font-semibold">
          HH:mm 10.11.2023
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
          <span>0</span>
        </div>
      </div>
    </div>
  );
}

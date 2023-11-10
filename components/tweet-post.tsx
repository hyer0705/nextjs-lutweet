"use client";

import Link from "next/link";

interface ITweetPostProps {
  tweetId?: number;
  name?: string;
  email?: string;
}

export default function TweetPost({ tweetId, name, email }: ITweetPostProps) {
  return (
    <div className="w-full p-3 bg-gray-900 rounded-md">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="text-base font-semibold">{name}</span>
            <span className="text-sm text-gray-400">{email}</span>
          </div>
        </div>
      </div>
      <Link href={`/tweet/${tweetId}`}>
        <div className="pl-12">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris erat
            risus, tincidunt sit amet tincidunt vel, blandit eget neque. Mauris
            vitae ultrices massa. Curabitur feugiat in augue volutpat rhoncus.
            Proin in ultricies odio, faucibus facilisis lectus. Etiam imperdiet
            euismod quam, eget mollis eros maximus a. Sed quis erat pretium,
            placerat ante vel, scelerisque tellus. Nam sagittis mattis neque,
            eget dapibus elit. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Nam nec sagittis augue,
            sed sodales neque. Vivamus auctor dui est, ut tristique ligula
            pellentesque laoreet. Nam pretium egestas tellus, maximus laoreet
            leo scelerisque eu. Quisque sed nibh non metus volutpat feugiat.
          </p>
        </div>
      </Link>
    </div>
  );
}

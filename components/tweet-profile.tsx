"use client";

export default function TweetProfile({
  name,
  email,
}: {
  name?: string;
  email?: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
      <div className="flex-1">
        <div className="flex flex-col">
          <span className="text-base font-semibold">{name}</span>
          <span className="text-sm text-gray-400">{email}</span>
        </div>
      </div>
    </div>
  );
}

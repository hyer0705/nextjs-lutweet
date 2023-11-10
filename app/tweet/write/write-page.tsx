"use client";

import Header from "../../../components/header";

export default function WritePage() {
  return (
    <div className="text-white">
      <Header title="Write" />
      <div className="flex space-x-2">
        <div className="w-10 h-10 bg-gray-500 rounded-full" />
        <form className="flex-1 space-y-4">
          <textarea
            className="resize-y w-full p-2 bg-inherit rounded-md focus:outline-none"
            rows={5}
            placeholder="What is happening?!"
          />
          <button className="w-full py-1 bg-white text-black rounded-xl rounded-tr-none">
            Write
          </button>
        </form>
      </div>
    </div>
  );
}

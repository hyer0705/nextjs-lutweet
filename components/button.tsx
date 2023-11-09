"use client";

export default function Btn({ text }: { text: string }) {
  return (
    <button className="bg-gray-900 py-4 rounded-2xl rounded-tr-none text-white hover:bg-gray-800">
      {text}
    </button>
  );
}

import { Metadata } from "next";
import "../global.css";
import { SWRProvider } from "./swr-provider";

export const metadata: Metadata = {
  title: "Home | Lutweet",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <SWRProvider>
          <main className="max-w-xl m-auto my-20 px-6 border border-white">
            {children}
          </main>
        </SWRProvider>
      </body>
    </html>
  );
}

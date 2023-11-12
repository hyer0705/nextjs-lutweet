import { Metadata } from "next";
import "../global.css";
import { SWRProvider } from "./swr-provider";

export const metadata: Metadata = {
  title: "Lutweet",
  description: "Welcome to Lutweet",
  icons: {
    icon: "/app/favicon.ico",
  },
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
          <main className="max-w-xl m-auto my-20 px-6">{children}</main>
        </SWRProvider>
      </body>
    </html>
  );
}

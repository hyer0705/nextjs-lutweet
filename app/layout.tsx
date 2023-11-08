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
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}

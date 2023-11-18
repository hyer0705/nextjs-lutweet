import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  console.log("===== middleware");
  console.log(request.nextUrl.pathname);
  const session = await getSession(request, res);
  const { user } = session;
  console.log(user);

  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/tweet")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/create-account", request.url));
    }
  }

  return res;
}

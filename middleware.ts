import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/tweet")
  ) {
    const session = await getSession(request, res);
    const { user } = session;
    // if (!user?.email) {
    if (!user) {
      return NextResponse.redirect(new URL("/create-account", request.url));
    }
  }

  return res;
}

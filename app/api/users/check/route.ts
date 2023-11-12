import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";

export async function GET(request: Request, response: Response) {
  try {
    const session = await getSession(request, response);
    const user = session.user;

    if (!user?.email) return NextResponse.json({ ok: false }, { status: 401 });

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (error) {
    console.error((error as Error).message);
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
    });
  }
}

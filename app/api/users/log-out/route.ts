import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";

export async function POST(request: Request) {
  try {
    const response = new Response();
    const session = await getSession(request, response);
    await session.destroy();

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

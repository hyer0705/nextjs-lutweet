import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    const user = await db.user.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        name,
        email,
        phone,
      },
    });

    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

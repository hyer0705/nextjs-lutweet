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

    if (!user) return Response.json({ ok: false }, { status: 401 });

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    /**
     * To Do
     * error 난 경우 status 어떻게 할지
     */
    return Response.json({ ok: false, error });
  }
}

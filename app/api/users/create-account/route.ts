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

    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error });
  }
}

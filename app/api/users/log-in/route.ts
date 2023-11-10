import db from "../../../../lib/db";
import { getSession } from "../../../../lib/session";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. select user
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    /**ToDo status 맞는지 확인 */
    if (!user) return Response.json({ ok: Boolean, status: 401 });

    // 2. save session
    const response = new Response();
    const session = await getSession(request, response);
    session.user = {
      email: user.email || "",
      name: user.name,
    };
    await session.save();

    return Response.json(
      { ok: true },
      { status: 200, headers: response.headers }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false });
  }
}

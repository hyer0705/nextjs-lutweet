export async function GET(request: Request) {
  console.log("===== /api/users/check");
  //   const res = await request.json();

  return Response.json({ ok: true });
}

import { neon } from "@neondatabase/serverless";

export async function PATCH(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { clerk_id, google_signin_id, walletaddress, balance } =
      await request.json();

    if (!walletaddress || !balance || (!clerk_id && !google_signin_id)) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isinvestor = balance >= 1;

    const response = await sql`
      UPDATE profiles
      SET walletaddress = ${walletaddress},
            isinvestor = ${isinvestor}
      WHERE clerk_id = ${clerk_id} OR google_signin_id = ${google_signin_id}
      RETURNING *;
    `;

    return new Response(JSON.stringify({ data: response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating wallet address:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

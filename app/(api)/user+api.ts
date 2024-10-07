import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const {
      fullname,
      firstname,
      lastname,
      email,
      photo,
      clerk_id,
      google_signin_id,
    } = await request.json();

    if (!fullname || !firstname || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO users (
        fullname,
        firstname,
        lastname,
        email,
        photo,
        clerk_id,
        google_signin_id
      ) 
      VALUES (
        ${fullname},
        ${firstname},
        ${lastname},
        ${email},
        ${photo},
        ${clerk_id},
        ${google_signin_id}
     );`;

    console.log(response);

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
      SELECT * FROM users;
    `;

    return new Response(JSON.stringify({ data: response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update api request

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const {
      fullname,
      firstname,
      lastname,
      email,
      photo,
      clerk_id,
      google_signin_id,
    } = await request.json();

    if (!fullname || !firstname || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      UPDATE users
      SET
        fullname = ${fullname},
        firstname = ${firstname},
        lastname = ${lastname},
        email = ${email},
        photo = ${photo},
        clerk_id = ${clerk_id},
        google_signin_id = ${google_signin_id}
      WHERE
        clerk_id = ${clerk_id}
    `;

    return new Response(JSON.stringify({ data: response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

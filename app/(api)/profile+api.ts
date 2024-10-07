import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const {
      clerk_id,
      google_signin_id,
      name,
      email,
      designation,
      profileBio,
      walletAddress,
      skills,
      interests,
      domains,
      projects,
      socialLinks,
      achievements,
      selectedGender,
      age,
      profilePicture,
      resume,
      date_of_birth,
      isInvestor,
      isRecruiter,
      companyId,
    } = await request.json();

    if (!name || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const serializedProjects = JSON.stringify(projects);
    const serializedSocialLinks = JSON.stringify(socialLinks);

    const response = await sql`
        INSERT INTO profiles (
          clerk_id,
          google_signin_id,
          name,
          email,
          designation,
          profileBio,
          walletAddress,
          skills,
          interests,
          domains,
          projects,
          socialLinks,
          achievements,
          selectedGender,
          age,
          profilePicture,
          resume,
          date_of_birth,
          isInvestor,
          isRecruiter,
          companyId
        )
        VALUES (
          ${clerk_id},
          ${google_signin_id},
          ${name},
          ${email},
          ${designation},
          ${profileBio},
          ${walletAddress},
          ${skills},
          ${interests},
          ${domains},
          ${serializedProjects},
          ${serializedSocialLinks},
          ${achievements},
          ${selectedGender},
          ${age},
          ${profilePicture},
          ${resume},
          ${date_of_birth},
          ${isInvestor},
          ${isRecruiter},
          ${companyId}
        );`;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT * FROM profiles;
      `;

    return new Response(JSON.stringify({ data: response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

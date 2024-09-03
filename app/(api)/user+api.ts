import { createUserSchema } from "@/apis/users";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL!);

    const body = await request.json();

    // Validate the request body
    const parsedBody = createUserSchema.parse(body);

    const { email, name, clerkId } = parsedBody;

    const response = await sql`
      INSERT INTO users (email, name, clerk_id) VALUES (${email}, ${name}, ${clerkId})
    `;

    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 400 });
    }
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong.", { status: 500 });
  }
}

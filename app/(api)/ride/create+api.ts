import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const createNewRideBodySchema = z.object({
  origin_address: z.string(),
  destination_address: z.string(),
  origin_latitude: z.number(),
  origin_longitude: z.number(),
  destination_latitude: z.number(),
  destination_longitude: z.number(),
  ride_time: z.string(),
  fare_price: z.number(),
  payment_status: z.string(),
  driver_id: z.number(),
  user_id: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    } = createNewRideBodySchema.parse(body);

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      INSERT INTO rides ( 
          origin_address, 
          destination_address, 
          origin_latitude, 
          origin_longitude, 
          destination_latitude, 
          destination_longitude, 
          ride_time, 
          fare_price, 
          payment_status, 
          driver_id, 
          user_id
      ) VALUES (
          ${origin_address},
          ${destination_address},
          ${origin_latitude},
          ${origin_longitude},
          ${destination_latitude},
          ${destination_longitude},
          ${ride_time},
          ${fare_price},
          ${payment_status},
          ${driver_id},
          ${user_id}
      )
      RETURNING *;
    `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    } else {
      console.error("Error inserting data into recent_rides:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}

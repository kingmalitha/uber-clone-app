import axios from "axios";
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

export const createRideApi = async (
  body: z.infer<typeof createNewRideBodySchema>,
) => {
  const response = await axios.post("/(api)/ride/create", body);
  return response.data;
};

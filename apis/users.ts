import { z } from "zod";
import axios from "axios";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  clerkId: z.string(),
});

export const createNewUserApi = async (
  body: z.infer<typeof createUserSchema>,
) => {
  const response = await axios.post("/(api)/users", body);

  return response.data;
};

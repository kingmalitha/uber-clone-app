import { z } from "zod";
import axios from "axios";
import Stripe from "stripe";

export const CreateIntentBodySchema = z.object({
  amount: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(255),
  paymentMethodId: z.string(),
});

export const CreatePaymentBodySchema = z.object({
  payment_method_id: z.string(),
  payment_intent_id: z.string(),
  customer_id: z.string(),
});

export interface CreateIntentResponse {
  paymentIntent: Stripe.PaymentIntent;
  ephemeralKey: Stripe.EphemeralKey;
  customer: string;
}

export interface CreatePaymentResponse {
  success: boolean;
  message: string;
  result: Stripe.PaymentIntent;
}

export const createNewIntentApi = async (
  body: z.infer<typeof CreateIntentBodySchema>,
) => {
  const response = await axios.post<CreateIntentResponse>(
    "/(api)/(stripe)/create",
    body,
  );

  return response.data;
};

export const createPayApi = async (
  body: z.infer<typeof CreatePaymentBodySchema>,
) => {
  const response = await axios.post<CreatePaymentResponse>(
    "/(api)/(stripe)/pay",
    body,
  );

  return response.data;
};

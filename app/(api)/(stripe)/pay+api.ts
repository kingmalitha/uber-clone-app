import { Stripe } from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const CreatePaymentBodySchema = z.object({
  payment_method_id: z.string(),
  payment_intent_id: z.string(),
  customer_id: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { payment_intent_id, payment_method_id, customer_id } =
      CreatePaymentBodySchema.parse(body);

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      { customer: customer_id },
    );

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });

    return new Response(
      JSON.stringify({
        sucess: true,
        message: "Payment Successful",
        result: result,
      }),
    );
  } catch (error) {
    if (error instanceof stripe.errors.StripeError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {
        status: 400,
      });
    } else {
      return new Response(JSON.stringify({ error: "Something Went Wrong" }), {
        status: 500,
      });
    }
  }
}

import { Stripe } from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const CreateIntentBodySchema = z.object({
  amount: z.string(),
  email: z.string().email(),
  name: z.string().min(2).max(255),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { amount, email, name } = CreateIntentBodySchema.parse(body);

    let customer: Stripe.Customer;

    const existingCustomer = await stripe.customers.list({
      email,
    });

    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name,
      });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-06-20" },
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
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

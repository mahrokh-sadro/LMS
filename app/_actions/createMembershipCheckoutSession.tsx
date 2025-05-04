import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// Price IDs from Stripe dashboard
const PRICES = {
  month: process.env.NEXT_PUBLIC_MONTHLY_STRIPE_PRICE_ID!,
  year: process.env.NEXT_PUBLIC_YEARLY_STRIPE_PRICE_ID!,
};

const origin = process.env.NEXT_PUBLIC_APP_URL;

export async function createMembershipCheckoutSession(
  email: string,
  subscription: "month" | "year" = "month"
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: PRICES[subscription],
        quantity: 1,
      },
    ],
    customer_email: email,
    success_url: `${origin}/membership/success?email=${email}`,
    cancel_url: `${origin}/membership/canceled`,
  });

  return session.url;
}

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51R2FT8GfAmxmqqaW6FfZCQQSjfoetCxvm8CYcYaMrOrstSS7W8FsMcCKacuuueaQmDRVcFiub0imePfb9IxZdjAJ00fUY6lyR3",
  {
    apiVersion: "2025-04-30.basil",
  }
);

export async function createMembershipCheckoutSession(email: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Membership",
            description: "Access to all premium courses",
          },
          unit_amount: 2399,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],

    customer_email: email,
    success_url: `http://localhost:3000/membership/success?email=${email}`,
    cancel_url: `http://localhost:3000/membership/canceled`,
  });

  return session.url;
}

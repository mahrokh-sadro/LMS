import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51R2FT8GfAmxmqqaW6FfZCQQSjfoetCxvm8CYcYaMrOrstSS7W8FsMcCKacuuueaQmDRVcFiub0imePfb9IxZdjAJ00fUY6lyR3",
  {
    apiVersion: "2025-04-30.basil",
  }
);

// Price IDs from Stripe dashboard
const PRICES = {
  month: "price_1RKVe4GfAmxmqqaW8q8Wgpp1",
  year: "price_1RKVhWGfAmxmqqaWV6yP9ndw",
};

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
    success_url: `http://localhost:3000/membership/success?email=${email}`,
    cancel_url: `http://localhost:3000/membership/canceled`,
  });

  return session.url;
}

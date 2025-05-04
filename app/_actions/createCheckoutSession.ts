import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function createCheckoutSession(course: any, email: string) {
  const priceInCents =
    course.price && !isNaN(course.price) && course.price > 0
      ? Math.round(course.price * 100)
      : 0;

  if (priceInCents === 0) {
    throw new Error("Invalid price provided");
  }
  const origin = process.env.NEXT_PUBLIC_APP_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.name,
            description: course.description,
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    success_url: `${origin}/checkout/${course.id}/success?email=${email}`,
    cancel_url: `${origin}/course-preview/${course.id}?canceled=true`,
  });

  return session.url;
}

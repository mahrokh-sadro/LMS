import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51R2FT8GfAmxmqqaW6FfZCQQSjfoetCxvm8CYcYaMrOrstSS7W8FsMcCKacuuueaQmDRVcFiub0imePfb9IxZdjAJ00fUY6lyR3",
  {
    apiVersion: "2025-04-30.basil", // Use valid version
  }
);

export async function createCheckoutSession(course: any, email: string) {
  const priceInCents =
    course.price && !isNaN(course.price) && course.price > 0
      ? Math.round(course.price * 100)
      : 0;

  if (priceInCents === 0) {
    throw new Error("Invalid price provided");
  }

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
    success_url: `http://localhost:3000/checkout/${course.id}/success?email=${email}`,
    cancel_url: `http://localhost:3000/course-preview/${course.id}?canceled=true`,
  });

  return session.url; // Return the session URL for redirection
}

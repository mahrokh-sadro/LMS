import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51R2FT8GfAmxmqqaW6FfZCQQSjfoetCxvm8CYcYaMrOrstSS7W8FsMcCKacuuueaQmDRVcFiub0imePfb9IxZdjAJ00fUY6lyR3",
  {
    apiVersion: "2025-04-30.basil",
  }
);

export async function createCheckoutSession(course: any, email: string) {
  // Log the course price to check if it's valid
  console.log("Course Price:", course.price);

  // Ensure the price is valid (positive number)
  const priceInCents =
    course.price && !isNaN(course.price) && course.price > 0
      ? Math.round(course.price * 100)
      : 0;

  if (priceInCents === 0) {
    throw new Error("Invalid price provided");
  }

  // Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.name, // Product name
            description: course.description, // Product description
          },
          unit_amount: priceInCents, // Price in cents
        },
        quantity: 1, // Quantity of the course (set to 1)
      },
    ],
    customer_email: email,
    success_url: `http://localhost:3000/view-course/${course.id}`,
    cancel_url: `http://localhost:3000/course-preview/${course.id}`,
  });

  return session.url; // Return the checkout session URL
}

"use client";

import React, { useState, useEffect } from "react";
import { getCourseById } from "@/app/_services/index";
import { createCheckoutSession } from "@/app/_actions/createCheckoutSession";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

const CheckoutPage = () => {
  const { user } = useUser();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const courseId = params.courseId;

  useEffect(() => {
    const initiateCheckout = async () => {
      if (user) {
        try {
          setLoading(true);
          const email = user.emailAddresses[0].emailAddress;

          const course = await getCourseById(courseId, email);

          const url = await createCheckoutSession(course.course, email);
          setCheckoutUrl(url);
        } catch (error) {
          console.error("Error during checkout initiation:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    initiateCheckout();
  }, [courseId, user]);

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold">Checkout for {courseId}</h1>
      {loading ? (
        <p>Loading checkout...</p>
      ) : checkoutUrl ? (
        <a
          href={checkoutUrl}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </a>
      ) : (
        <p>Loading checkout session...</p>
      )}
    </div>
  );
};

export default CheckoutPage;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { EnrollCourse, PublishCourse } from "@/app/_services/index";

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const enrollMembership = async () => {
      if (!user) return;

      const email = user.emailAddresses[0]?.emailAddress;

      try {
        const enrollment = await EnrollCourse(null, email, true);
        await PublishCourse(enrollment.createUserEnrollCourse.id);

        console.log("Membership enrollment successful:", enrollment);
      } catch (err) {
        console.error("Enrollment failed:", err);
      }
    };

    enrollMembership();
  }, [user]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Membership Success</h1>
      <p className="text-lg text-green-600">
        Your membership has been successfully activated!
      </p>
    </div>
  );
};

export default SuccessPage;

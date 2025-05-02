"use client";

import { EnrollCourse, PublishCourse } from "@/app/_services/index";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createMembershipCheckoutSession } from "@/app/_actions/createMembershipCheckoutSession";

interface EnrollmentSectionProps {
  course: any;
  enrollment: any;
}

const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({
  course,
  enrollment,
}) => {
  const { user } = useUser();
  const router = useRouter();
  console.log("EnrollmentSection enrollment", enrollment);
  const isMember = enrollment ? enrollment.membership : false;
  console.log("isMember", isMember);
  const handleEnroll = async () => {
    if (user) {
      try {
        const enrollmentResponse = await EnrollCourse(
          course.id,
          user?.emailAddresses[0].emailAddress
        );

        if (enrollmentResponse) {
          const publishResponse = await PublishCourse(
            enrollmentResponse?.createUserEnrollCourse?.id
          );

          if (publishResponse) {
            router.push("/view-course/" + course.id);
          }
        }
      } catch (error) {
        console.error("Enrollment failed", error);
      }
    } else {
      router.push("/");
    }
  };

  const handleBuyCourse = async () => {
    // console.log("Buy course clicked", course.id);
    if (user) {
      router.push(`/checkout/${course.id}`);
    } else {
      router.push("/");
    }
  };

  const handleBuyMembership = async () => {
    if (user) {
      try {
        const url = await createMembershipCheckoutSession(
          user.emailAddresses[0].emailAddress
        );
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error("Membership checkout failed:", error);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {enrollment?.courseId && (
        <button
          onClick={() => router.push("/view-course/" + course.id)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Continue
        </button>
      )}

      {isMember ||
        (course.free && !enrollment?.courseId && (
          <button
            onClick={handleEnroll}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Enroll Now
          </button>
        ))}

      {!isMember && !course.free && !enrollment?.courseId && (
        <button
          onClick={handleBuyCourse}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Buy this course
        </button>
      )}

      {!isMember ? (
        <button
          onClick={handleBuyMembership}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Buy Membership
        </button>
      ) : (
        <button
          disabled
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
          You are a member
        </button>
      )}
    </div>
  );
};

export default EnrollmentSection;

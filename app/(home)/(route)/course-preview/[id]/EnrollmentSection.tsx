"use client";

import { EnrollCourse } from "@/app/_services/index";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const EnrollmentSection = ({ course }) => {
  const { user } = useUser();
  const router = useRouter();

  console.log("EnrollmentSection----->", user?.emailAddresses[0].emailAddress);
  const handleEnroll = async () => {
    // console.log("User enrolled into course:", course.id);
    // setIsEnrolled(true);
    if (user) {
      await EnrollCourse(course.id, user?.emailAddresses[0].emailAddress).then(
        (res) => {
          console.log("enroll", res);
        }
      );
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div>
      {course.free ? (
        <button
          onClick={handleEnroll}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>
      ) : (
        <button
          // onClick={handleEnroll}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Buy this course
        </button>
      )}

      <button
        // onClick={handleEnroll}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-4"
      >
        Buy Membership
      </button>
    </div>
  );
};

export default EnrollmentSection;

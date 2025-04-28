"use client";

import { EnrollCourse, PublishCourse } from "@/app/_services/index";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  const handleEnroll = async () => {
    if (user) {
      await EnrollCourse(course.id, user?.emailAddresses[0].emailAddress).then(
        async (res) => {
          if (res) {
            await PublishCourse(res?.createUserEnrollCourse?.id).then((res) => {
              console.log("published", res);
              if (res) {
                router.push("/view-course" + course.id);
              }
            });
          }
        }
      );
    } else {
      router.push("/");
    }
  };
  console.log("enrolled", enrollment);
  return (
    <div>
      {enrollment?.courseId ? (
        <div>
          <button
            onClick={() => router.push("/view-course/" + course.id)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      ) : null}
      {course.free && !enrollment?.courseId ? (
        <button
          onClick={handleEnroll}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>
      ) : !enrollment?.courseId ? (
        <button
          // onClick={handleEnroll}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Buy this course
        </button>
      ) : null}

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

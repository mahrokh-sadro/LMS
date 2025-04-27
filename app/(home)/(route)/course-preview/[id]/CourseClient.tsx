"use client";

import { useState } from "react";
import Image from "next/image";
import OptionSection from "./OptionSection";
import EnrollmentSection from "./EnrollmentSection";

interface CourseClientProps {
  course: any;
}

const CourseClient: React.FC<CourseClientProps> = ({ course }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = () => {
    console.log("User enrolled into course:", course.id);
    setIsEnrolled(true);
  };

  // Function to transform normal youtube link to embeddable link
  const getYoutubeEmbedUrl = (url: string) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course?.name}</h1>

      {course?.banner?.url && (
        <div className="relative w-full h-[300px]">
          <Image
            src={course.banner.url}
            alt="Course Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        </div>
      )}

      <p className="mt-4">{course?.description}</p>

      {/* Embed YouTube Video */}
      {course?.youtubeUrl && (
        <div className="w-full aspect-video mt-6">
          <iframe
            src={getYoutubeEmbedUrl(course.youtubeUrl)}
            title="YouTube Video"
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* <div className="mt-6">
        {!isEnrolled ? (
          <button
            onClick={handleEnroll}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Enroll Now
          </button>
        ) : (
          <p className="text-green-600 font-semibold">✅ You are enrolled!</p>
        )}
      </div> */}
      <div className="mt-6">
        <OptionSection />
        <EnrollmentSection course={course} />
      </div>
    </div>
  );
};

export default CourseClient;

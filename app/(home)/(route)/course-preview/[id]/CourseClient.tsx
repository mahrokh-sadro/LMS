"use client";

import { useState } from "react";
import Image from "next/image";
import OptionSection from "./OptionSection";
import EnrollmentSection from "./EnrollmentSection";

interface CourseClientProps {
  course: any;
  enrollment: any;
}

const CourseClient: React.FC<CourseClientProps> = ({ course, enrollment }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  console.log("course", course.name);

  const handleEnroll = () => {
    console.log("User enrolled into course:", course.id);
    setIsEnrolled(true);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT side */}
        <div className="md:col-span-2">
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
        </div>

        {/* RIGHT side (Sticky) */}
        <div className="mt-6 md:mt-0 sticky top-28 self-start">
          <OptionSection />
          <EnrollmentSection course={course} />
        </div>
      </div>
    </div>
  );
};

export default CourseClient;

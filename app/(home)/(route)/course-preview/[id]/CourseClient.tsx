"use client";

import { useState } from "react";
import Image from "next/image";
import EnrollmentSection from "./EnrollmentSection";

interface CourseClientProps {
  course: any;
  enrollment: any;
}

const CourseClient: React.FC<CourseClientProps> = ({ course, enrollment }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const getYoutubeEmbedUrl = (url: string) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };
  // console.log(course);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{course?.name}</h1>
            <p className="text-gray-600 mt-2">By {course?.author?.name}</p>
          </div>

          {course?.banner?.url && (
            <div className="relative w-full h-[300px]">
              <Image
                src={course.banner.url}
                alt="Course Banner"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                loading="lazy"
              />
            </div>
          )}
          {/* YouTube Preview */}
          {/* {course?.youtubeUrl && (
            <div className="w-full aspect-video mt-6 mb-8">
              <iframe
                src={getYoutubeEmbedUrl(course.youtubeUrl)}
                title="YouTube Video"
                className="w-full h-full rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          )} */}
          {/* What you'll learn */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course?.outcomes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-gray-100 p-4 rounded-lg text-sm text-gray-800"
                >
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {course?.description}
            </p>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {course?.requirements?.map((t: string, index: number) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
            <div className="flex items-center space-x-4">
              <Image
                src={course.author?.image?.url}
                alt="Instructor"
                width={60}
                height={60}
                className="rounded-full"
                loading="lazy"
              />
              <div>
                <p className="font-medium text-lg">{course?.author?.name}</p>
                <p className="text-gray-600 text-sm">{course?.author?.role}</p>
              </div>
            </div>
          </section>

          {/* Embedded video (optional) */}
          {course?.youtubeUrl && (
            <div className="w-full aspect-video">
              <iframe
                src={getYoutubeEmbedUrl(course.youtubeUrl)}
                title="YouTube Video"
                className="w-full h-full rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-28">
            <EnrollmentSection course={course} enrollment={enrollment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseClient;

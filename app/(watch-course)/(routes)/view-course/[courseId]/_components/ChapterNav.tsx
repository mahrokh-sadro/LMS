"use client";

import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface ChapterNavProps {
  course: {
    name: string;
    // author: string;
    chapter: Array<{
      id: string;
      title: string;
      description: string | null;
      videoUrl: string | null;
      position: number | null;
    }>;
  };
  enrollment: {
    courseId: string;
    userEmail: string;
    completedChapterId: any;
  };
  setActiveChapter: any;
}

const ChapterNav: React.FC<ChapterNavProps> = ({
  course,
  enrollment,
  setActiveChapter,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (course?.chapter?.[0]) {
      setActiveChapter(course.chapter[0]);
    }
  }, [course, setActiveChapter]);

  const handlePlayPause = (index: number, chapter: any) => {
    if (activeIndex === index) {
      setIsPlaying((prev) => !prev);
    } else {
      setActiveIndex(index);
      setActiveChapter(chapter);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800">{course?.name}</h1>
      {/* <p className="text-md text-gray-500 mt-1">Author: {course?.author}</p> */}

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Chapters</h2>
        <ul className="space-y-4 mt-4">
          {course.chapter.map((chapter, index) => (
            <li
              key={chapter.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                activeIndex === index
                  ? "bg-blue-100 text-blue-600"
                  : enrollment.completedChapter === chapter.id
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-50 text-gray-600"
              } hover:bg-blue-50 cursor-pointer transition-all duration-200`}
              onClick={() => handlePlayPause(index, chapter)}
            >
              <div className="flex items-center">
                {isPlaying && activeIndex === index ? (
                  <FaPause className="h-6 w-6 text-blue-600 mr-2 cursor-pointer" />
                ) : (
                  <FaPlay className="h-6 w-6 text-gray-500 mr-2 cursor-pointer" />
                )}
                <div>
                  <h3 className="text-md font-medium">{chapter?.title}</h3>
                  {chapter.description && (
                    <p className="text-sm text-gray-500">
                      {chapter?.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChapterNav;

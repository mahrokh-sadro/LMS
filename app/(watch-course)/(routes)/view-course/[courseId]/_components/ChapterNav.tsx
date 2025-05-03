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
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-6">{course?.name}</h1>
      <h2 className="text-md font-semibold mb-2 text-gray-300">Chapters</h2>
      <ul className="space-y-2">
        {course.chapter.map((chapter, index) => {
          const isActive = activeIndex === index;
          const isCompleted = enrollment.completedChapterId?.includes(
            chapter.id
          );

          return (
            <li
              key={chapter.id}
              className={`flex items-start p-3 rounded-lg transition-colors duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-700 text-gray-300"
                }
              `}
              onClick={() => handlePlayPause(index, chapter)}
            >
              <div className="mr-3 pt-1">
                {isPlaying && isActive ? (
                  <FaPause className="text-white" />
                ) : (
                  <FaPlay className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium leading-tight">{chapter.title}</h3>
                {chapter.description && (
                  <p className="text-sm text-gray-400">{chapter.description}</p>
                )}
              </div>
              {isCompleted && (
                <span className="ml-2 text-green-400 text-sm">✔</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChapterNav;

"use client";

import React, { useState } from "react";
import ChapterNav from "./ChapterNav";
import FullVideoPlayer from "./FullVideoPlayer";

interface ChapterClientProps {
  course: any;
  enrollment: any;
}

const ChapterClient: React.FC<ChapterClientProps> = ({
  course,
  enrollment,
}) => {
  const [activeChapter, setActiveChapter] = useState(
    course?.chapter[0] || null
  );

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-[#1e293b] text-white p-4 overflow-y-auto">
        <ChapterNav
          course={course}
          enrollment={enrollment}
          setActiveChapter={setActiveChapter}
        />
      </div>

      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <FullVideoPlayer
          course={course}
          enrollment={enrollment}
          activeChapter={activeChapter}
        />
      </div>
    </div>
  );
};

export default ChapterClient;

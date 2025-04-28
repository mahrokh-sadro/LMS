"use client";

import React from "react";

interface FullVideoPlayerProps {
  course: any;
  enrollment: any;
  activeChapter: any;
}

const FullVideoPlayer: React.FC<FullVideoPlayerProps> = ({
  course,
  enrollment,
  activeChapter,
}) => {
  if (!activeChapter) return <div>No chapter selected</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{activeChapter.title}</h1>
      {activeChapter.videoUrl ? (
        <video
          src={activeChapter.videoUrl}
          controls
          className="w-full h-auto rounded-lg shadow-md"
        />
      ) : (
        <p className="text-gray-500">No video available for this chapter.</p>
      )}
    </div>
  );
};

export default FullVideoPlayer;

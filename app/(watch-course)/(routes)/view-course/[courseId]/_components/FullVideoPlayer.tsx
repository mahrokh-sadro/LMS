"use client";

import React, { useEffect, useState } from "react";

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
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(
      enrollment?.completedChapterId?.includes(activeChapter?.id) ?? false
    );
  }, [enrollment, activeChapter]);

  if (!activeChapter) return <div>No chapter selected</div>;

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";

    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || "";
    } else {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };
  const updatedCompletedChapters = enrollment?.completedChapterId || [];
  // const handleMarkAsCompleted = async () => {
  //   await markChapterCompleted(
  //     enrollment?.id,
  //     updatedCompletedChapters,
  //     activeChapter?.id
  //   ).then((res) => {
  //     setCompleted(true);
  //   });
  // };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {activeChapter.title}
      </h1>

      {activeChapter.videoUrl ? (
        isYouTubeUrl(activeChapter.videoUrl) ? (
          <iframe
            src={getYouTubeEmbedUrl(activeChapter.videoUrl)}
            title="YouTube video player"
            className="w-full h-[450px] rounded-lg shadow mb-4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={activeChapter.videoUrl}
            controls
            className="w-full h-auto rounded-lg shadow mb-4"
          />
        )
      ) : (
        <p className="text-gray-500 mb-4">
          No video available for this chapter.
        </p>
      )}

      {/* {!completed ? (
        <button
          onClick={handleMarkAsCompleted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
        >
          Mark as Completed
        </button>
      ) : (
        <p className="text-green-600 font-semibold">✅ Chapter completed</p>
      )} */}
    </div>
  );
};

export default FullVideoPlayer;

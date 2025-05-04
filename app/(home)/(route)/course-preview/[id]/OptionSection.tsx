"use client";
import React from "react";
import { FaGithub, FaDesktop, FaYoutube } from "react-icons/fa";

const OptionSection: React.FC = () => {
  const options = [
    {
      id: 1,
      name: "Github",
      icon: <FaGithub size={24} />,
    },
    {
      id: 2,
      name: "Demo",
      icon: <FaDesktop size={24} />,
    },
    {
      id: 3,
      name: "Youtube",
      icon: <FaYoutube size={24} />,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Options</h2>
      <div className="flex gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex flex-col items-center p-1 border rounded-lg hover:bg-gray-100 transition cursor-pointer w-20"
          >
            <div className="text-primary mb-2">{option.icon}</div>
            <span className="text-gray-800 font-medium text-center">
              {option.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionSection;

"use client";
import React from "react";
import Image from "next/image";
import EmptyStateCard from "@/app/(home)/_components/EmptyStateCard";

interface Course {
  id: string;
  name: string;
  description: string;
  banner?: {
    url: string;
  };
}

const DashboardClient: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <div>
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((course: any) => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <Image
              src={course.banner?.url}
              alt={course.name}
              width={40}
              height={40}
              loading="lazy"
            />
          </div>
        ))
      ) : (
        <EmptyStateCard />
      )}
    </div>
  );
};

export default DashboardClient;

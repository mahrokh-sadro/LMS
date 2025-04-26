"use client";
import React from "react";
import Image from "next/image";

const CourseList = ({ courses }) => {
  return (
    <div>
      {courses.map((course, index) => (
        <div key={index}>
          {course.name}
          {course.banner?.url && (
            <Image
              src={course.banner?.url}
              alt={course.name}
              width={400}
              height={250}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseList;

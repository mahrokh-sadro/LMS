"use client";
import React, { useEffect, useState } from "react";
import CategoryFilter from "./_components/CategoryFilter";
import { getCourseList } from "../../../_services/index";
import CourseList from "./_components/CourseList";

const Browse = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList().then((res) => {
      console.log("Courses:", res);
      setCourses(res);
    });
  };

  return (
    <div>
      dashssssssssssssssssss
      <CategoryFilter />
      <CourseList courses={courses} />
    </div>
  );
};

export default Browse;

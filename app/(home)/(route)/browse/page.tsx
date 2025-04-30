"use client";
import React, { useEffect, useState } from "react";
import CategoryFilter from "./_components/CategoryFilter";
import { getCourseList } from "../../../_services/index";
import CourseList from "./_components/CourseList";

const Browse = () => {
  const [filteredCategory, setFilteredCategory] = useState("");

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
  const filteredCourses = filteredCategory
    ? courses.filter((course: any) => course?.category === filteredCategory)
    : courses;
  return (
    <div>
      dashssssssssssssssssss
      <CategoryFilter onFilterChange={setFilteredCategory} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default Browse;

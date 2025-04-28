import React from "react";
import ChapterClient from "./_components/ChapterClient";
import { currentUser } from "@clerk/nextjs/server";
import { getCourseById } from "../../../../_services/index";

interface IParams {
  courseId: string;
}

export default async function ViewCourse({ params }: { params: IParams }) {
  const user = await currentUser();

  const course = await getCourseById(
    params.courseId,
    user?.emailAddresses[0].emailAddress
  );

  return (
    <ChapterClient course={course.course} enrollment={course.enrollment} />
  );
}

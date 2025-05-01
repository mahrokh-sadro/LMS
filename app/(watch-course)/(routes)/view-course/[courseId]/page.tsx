import React from "react";
import ChapterClient from "./_components/ChapterClient";
import { currentUser } from "@clerk/nextjs/server";
import { getCourseById } from "../../../../_services/index";

interface IParams {
  courseId: any;
}

export default async function ViewCourse({
  params,
}: {
  params: Promise<IParams>;
}) {
  const user = await currentUser();
  const paramsData = await params;
  const course = await getCourseById(
    paramsData?.courseId,
    user?.emailAddresses[0].emailAddress
  );
  // console.log("course", course);
  return (
    // <></>
    <ChapterClient course={course.course} enrollment={course.enrollment} />
  );
}

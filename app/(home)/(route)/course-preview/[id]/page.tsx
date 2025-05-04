import { getCourseById } from "../../../../_services/index";
import CourseClient from "./CourseClient";
import { currentUser } from "@clerk/nextjs/server";

interface IParams {
  id: string;
}

export default async function ListingPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const user = await currentUser();
  const paramsData = await params;
  const course = await getCourseById(
    paramsData.id,
    user?.emailAddresses[0].emailAddress
  );

  return (
    <>
      <CourseClient course={course.course} enrollment={course.enrollment} />
    </>
  );
}

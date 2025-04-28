// app/listings/[listingId]/page.tsx
import { getCourseById } from "../../../../_services/index";
import CourseClient from "./CourseClient";
import { auth, currentUser } from "@clerk/nextjs/server";

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
  console.log("course------------", course);

  // if (!listing) {
  //   return <div className="text-center text-xl mt-10">Listing not found</div>;
  // }

  return (
    <>
      <CourseClient course={course.course} enrollment={course.enrollment} />
    </>
  );
}

// app/listings/[listingId]/page.tsx
import { getCourseById } from "../../../../_services/index";
import CourseClient from "./CourseClient";

interface IParams {
  id: string;
}

export default async function ListingPage({
  params,
}: {
  params: Promise<IParams>;
}) {
  const paramsData = await params;
  const course = await getCourseById(paramsData.id);
  console.log(paramsData.id);
  // console.log("course", course);

  // if (!listing) {
  //   return <div className="text-center text-xl mt-10">Listing not found</div>;
  // }

  return (
    <>
      <CourseClient course={course} />
    </>
  );
}

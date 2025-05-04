import { EnrollCourse, PublishCourse } from "@/app/_services/index";
import SuccessRedirect from "./SuccessRedirect";
import { currentUser } from "@clerk/nextjs/server";

interface SuccessPageProps {
  params: any;
  searchParams: any;
}

const SuccessPage = async ({ params, searchParams }: SuccessPageProps) => {
  const user = await currentUser();
  const email = searchParams.email || user?.emailAddresses[0].emailAddress;
  const courseId = params.courseId;

  if (!email || !courseId) {
    return <div>Invalid checkout result. Please contact support.</div>;
  }

  try {
    const enrollment = await EnrollCourse(courseId, email);
    await PublishCourse(enrollment.createUserEnrollCourse.id);

    return <SuccessRedirect courseId={courseId} />;
  } catch (error) {
    console.error("Enrollment error after Stripe payment:", error);
    return <div>Payment succeeded but enrollment failed. Contact support.</div>;
  }
};

export default SuccessPage;

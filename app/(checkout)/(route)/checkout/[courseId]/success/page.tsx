// app/(checkout)/(route)/checkout/[courseId]/success/page.tsx

import { EnrollCourse, PublishCourse } from "@/app/_services/index";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

interface SuccessPageProps {
  params: { courseId: string };
  searchParams: { email?: string };
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

    // ✅ Redirect to course view page
    redirect(`/view-course/${courseId}`);
  } catch (error) {
    console.error("Enrollment error after Stripe payment:", error);
    return (
      <div>
        Payment was successful, but enrollment failed. Please contact support.
      </div>
    );
  }
};

export default SuccessPage;

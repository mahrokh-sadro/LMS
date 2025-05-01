"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SuccessRedirect = ({ courseId }: { courseId: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/view-course/${courseId}`);
  }, [courseId, router]);

  return <p>Redirecting to your course...</p>;
};

export default SuccessRedirect;

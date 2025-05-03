import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GetUserCourseList } from "@/app/_services/index";
import DashboardClient from "./_components/DashboardClient";
import CourseList from "../browse/_components/CourseList";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const userCourses = await GetUserCourseList(
    user?.emailAddresses[0].emailAddress
  );

  // console.log("userCourses", userCourses);
  return (
    <div>
      <CourseList courses={userCourses} />
    </div>
  );
};

export default Dashboard;

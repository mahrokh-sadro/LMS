import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { GetUserCourseList } from "@/app/_services/index";
// import DashboardClient from "./_components/DashboardClient";
import CourseList from "../browse/_components/CourseList";
import { redirect } from "next/navigation";
import EmptyStateCard from "../../_components/EmptyStateCard";

const Dashboard = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const userCourses = await GetUserCourseList(
    user?.emailAddresses[0].emailAddress
  );

  console.log("course", userCourses);
  return (
    <div>
      {userCourses && userCourses.length > 0 ? (
        <CourseList courses={userCourses} />
      ) : (
        <EmptyStateCard />
      )}
    </div>
  );
};

export default Dashboard;

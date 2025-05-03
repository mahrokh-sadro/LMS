import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GetUserCourseList } from "@/app/_services/index";
import DashboardClient from "./_components/DashboardClient";
import CourseList from "../browse/_components/CourseList";

const Dashboard = async () => {
  const user = await currentUser();

  const userCourses = await GetUserCourseList(
    user?.emailAddresses[0].emailAddress
  );

  return (
    <div>
      <CourseList courses={userCourses} />
    </div>
  );
};

export default Dashboard;

import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GetUserCourseList } from "@/app/_services/index";
import DashboardClient from "./_components/DashboardClient";

const Dashboard = async () => {
  const user = await currentUser();

  const userCourses = await GetUserCourseList(
    user?.emailAddresses[0].emailAddress
  );

  console.log("userCourses", userCourses);
  return (
    <div>
      <DashboardClient courses={userCourses} />
    </div>
  );
};

export default Dashboard;

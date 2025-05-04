"use client";
// app/UserButtonWrapper.tsx'

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

const UserButtonWrapper = () => {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component has been mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optionally, render nothing or a placeholder before mounting
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <UserButton
        afterSignOutUrl="/"
        className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-200"
      />
    </div>
  );
};

export default UserButtonWrapper;

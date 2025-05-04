"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

const UserButtonWrapper = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <UserButton
      // afterSignOutUrl="/"
      // className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-200"
      />
    </div>
  );
};

export default UserButtonWrapper;

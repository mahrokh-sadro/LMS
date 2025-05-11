"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import UserButtonWrapper from "../app/UserButtonWrapper";

export default function Header() {
  return (
    <header className="w-full bg-gray-200 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/browse" className="text-xl font-semibold">
          Browse Courses
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <SignedOut>
            <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <SignInButton />
            </div>
            <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <SignUpButton />
            </div>
          </SignedOut>

          <SignedIn>
            <UserButtonWrapper />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

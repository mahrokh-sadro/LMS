"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-20 py-12 gap-16 text-center font-[family-name:var(--font-geist-sans)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 max-w-2xl"
      >
        <h1 className="text-4xl sm:text-6xl font-bold">
          Learn, Build, and Launch with Confidence
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          A developer-first platform built to accelerate your journey. Powered
          by Next.js, Clerk, and GraphCMS.
        </p>
        <Link
          href="/browse"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Courses
        </Link>
      </motion.div>

      {/* Placeholder for featured section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-6xl"
      >
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-40">
          🎯 Featured Course
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-40">
          🚀 Project Highlight
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-40">
          📚 Learn More
        </div>
      </motion.div>
    </div>
  );
}

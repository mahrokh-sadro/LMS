"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaBullseye, FaRocket, FaBookOpen } from "react-icons/fa";

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

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-6xl"
      >
        {/* 🎯 Featured Course */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
          <FaBullseye className="text-4xl text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Featured Course
          </h3>
          <p className="text-gray-600 text-sm">
            Master Next.js from scratch. Build full-stack applications with
            authentication, CMS, and deployment best practices.
          </p>
        </div>

        {/* 🚀 Project Highlight */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
          <FaRocket className="text-4xl text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Project Highlight
          </h3>
          <p className="text-gray-600 text-sm">
            Check out our AI-powered portfolio builder. Learn how it was built
            using Next.js, Prisma, and Vercel Edge Functions.
          </p>
        </div>

        {/* 📚 Learn More */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
          <FaBookOpen className="text-4xl text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Learn More
          </h3>
          <p className="text-gray-600 text-sm">
            Explore our blog and documentation to deepen your understanding of
            web development trends and best practices.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

import React from "react";

const EnrollmentSection = ({ course }) => {
  const handleEnroll = () => {
    console.log("User enrolled into course:", course.id);
    // setIsEnrolled(true);
  };
  return (
    <div>
      {course.free ? (
        <button
          onClick={handleEnroll}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Enroll Now
        </button>
      ) : (
        <button
          onClick={handleEnroll}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Buy this course
        </button>
      )}

      <button
        onClick={handleEnroll}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-4"
      >
        Buy Membership
      </button>
    </div>
  );
};

export default EnrollmentSection;

import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://us-west-2.cdn.hygraph.com/content/cm9uqrzko00np07w4mcx8x12s/master";

export const getCourseList = async () => {
  const query = gql`
    query Courses {
      courseLists {
        name
        banner {
          url
        }
        description
        free
        id
        totalChapters
        category
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result.courseLists;
};

export const getCourseById = async (id, userEmail) => {
  const query = gql`
    query GetCourseAndEnrollment {
      courseLists(where: { id: "${id}" }) {
        id
        name
        banner {
          url
        }
        description
        free
        totalChapters
        youtubeUrl
        chapter(orderBy: position_ASC) {
          id
          title
          description
          videoUrl
          position
          freePreview
        }
        author {
          id
          image {
            url
          }
          name
          role
        }  
        requirements  
        outcomes
        price
      }
     userEnrollCourses(where: { userEmail: "${userEmail}" }) {
        id
        courseId
        userEmail
        membership
        completedChapterId
      }
    }
  `;

  const result = await request(MASTER_URL, query);

  return {
    course: result.courseLists[0],
    enrollment: result.userEnrollCourses[0] || null,
  };
};

export const EnrollCourse = async (id, userEmail, membership = false) => {
  if (!id) id = "";
  console.log("ID", id);
  const mutationQuery =
    gql`
    mutation MyMutation {
      createUserEnrollCourse(
        data: { userEmail: "` +
    userEmail +
    `",
                courseId: "` +
    id +
    `" ,
                membership: ` +
    membership +
    `,
                
                }
          ) {
            id
          }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const PublishCourse = async (id) => {
  const mutationQuery = gql`
  mutation MyMutation {
    publishUserEnrollCourse(where: { id: "${id}" }) {
      id
    }
  }
`;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

// export const markChapterCompleted = async (
//   enrollmentId,
//   existingCompletedChapters,
//   completedChapterId
// ) => {
//   const updatedCompletedChapters = [
//     ...new Set([...existingCompletedChapters, completedChapterId]), // Ensuring uniqueness
//   ];

//   const mutationQuery = `
//     mutation UpdateCompletedChapters($id: ID!, $completedChapterIds: [String!]) {
//       updateUserEnrollCourse(
//         where: { id: $id }
//         data: {
//           completedChapterId: {
//             add: $completedChapterIds
//           }
//         }
//       ) {
//         id
//         completedChapterId
//       }
//       publishManyUsersEnrollCourseConnection(to) {
//         i
//       }
//     }
//   `;

//   const variables = {
//     id: enrollmentId,
//     completedChapterIds: updatedCompletedChapters,
//   };

//   try {
//     const result = await request(MASTER_URL, mutationQuery, variables);
//     return result;
//   } catch (error) {
//     console.error("Error marking chapter as completed:", error);
//     throw error;
//   }
// };
export const GetUserCourseList = async (email) => {
  try {
    const query =
      gql`
      query MyQuery {
        userEnrollCourses(where: { userEmail: "` +
      email +
      `" }) {
          courseList {
            id
            name
            free
            description
            banner {
              url
            }
          }
        }
      }
    `;
    const result = await request(MASTER_URL, query);
    console.log("Result:", result);
    const courses = result.userEnrollCourses;
    // ?.flatMap((enroll) => enroll.courseList)
    // .filter(Boolean);
    console.log("Courses:", courses);
    return courses;
  } catch (error) {
    console.error("Error fetching user course list:", error);
    return [];
  }
};

export const getUserMembership = async (userEmail) => {
  const query = gql`
    query GetMembership {
    
     userEnrollCourses(where: { userEmail: "${userEmail}" }) {
        id
        courseId
        userEmail
        membership
        completedChapterId
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  const allEnrollments = result.userEnrollCourses;

  const membershipEnrollment = allEnrollments.find(
    (e) => e.membership === true
  );

  return membershipEnrollment;
};

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
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result.courseLists;
};

export const getCourseById = async (id) => {
  const query =
    gql`
    query course {
      courseLists(where: { id: "` +
    id +
    `" }) {
        id
        name
        banner {
          url
        }
        description
        free
        totalChapters
        youtubeUrl
      }

       userEnrollCourses(where: {courseId: "` +
    id +
    `",
    userEmail: "` +
    userEmail +
    `"}) {
    courseId
    userEmail
    completedChapter

  }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result.courseLists[0];
};

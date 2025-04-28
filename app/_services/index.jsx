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
        author
        chapter(orderBy: position_ASC) {
          id
          title
          description
          videoUrl
          position
          freePreview
        }
      }
      userEnrollCourses(where: { courseId: "${id}", userEmail: "${userEmail}" }) {
        courseId
        userEmail
        completedChapter
      }
    }
  `;

  const result = await request(MASTER_URL, query);

  return {
    course: result.courseLists[0],
    enrollment: result.userEnrollCourses[0] || null, // if not enrolled, null
  };
};

export const EnrollCourse = async (id, userEmail) => {
  const mutationQuery =
    gql`
    mutation MyMutation {
      createUserEnrollCourse(
        data: { userEmail: "` +
    userEmail +
    `", courseId: "` +
    id +
    `" }
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

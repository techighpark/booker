import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const userCheck = await client.user.findUnique({
        where: { username },
        include: {
          followerUser: true,
          followingUser: true,
          followingAuthor: { include: { books: true } },
          followingBook: { include: { author: true } },
          bookReviews: { include: { user: true } },
        },
      });
      if (!userCheck) {
        return null;
      }
      return userCheck;
    },
  },
};

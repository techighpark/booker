import client from "../../client";

export default {
  Query: {
    searchPost: async (_, { keyword }) => {
      return await client.post.findMany({
        where: { hashtags: { some: { hashtag: { contains: keyword } } } },
        include: { user: true },
      });
    },
  },
};

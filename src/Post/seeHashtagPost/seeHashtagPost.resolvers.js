import client from "../../client";

export default {
  Query: {
    seeHashtagPost: async (_, { hashtag }) => {
      const postCheck = await client.post.findMany({
        where: { hashtags: { some: { hashtag } } },
      });
      return postCheck;
    },
  },
};

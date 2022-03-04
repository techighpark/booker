import client from "../../client";

export default {
  Query: {
    seePostLikes: (_, { postId }) =>
      client.user.findMany({
        where: { postLikes: { some: { postId } } },
      }),
  },
};

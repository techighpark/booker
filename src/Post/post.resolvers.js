import client from "../client";
import { protectedResolver } from "../User/user.utils";

export default {
  Post: {
    totalLikes: ({ id }) => client.postLike.count({ where: { postId: id } }),
    isLiked: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const postCheck = await client.postLike.findFirst({
        where: { AND: [{ userId: loggedInUser.id }, { postId: id }] },
      });
      return Boolean(postCheck);
    }),
    totalComments: ({ id }) => client.comment.count({ where: { postId: id } }),
  },
};

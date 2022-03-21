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
    isMine: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const postCheck = await client.post.findUnique({ where: { id } });
      return Boolean(postCheck.userId === loggedInUser.id);
    }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { posts: { some: { id } } } }),
  },
  Hashtag: {
    totalPosts: ({ id }) =>
      client.post.count({ where: { hashtags: { some: { id } } } }),
  },
};

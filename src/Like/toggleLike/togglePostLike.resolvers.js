import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    togglePostLike: protectedResolver(
      async (_, { postId }, { loggedInUser }) => {
        const postCheck = await client.post.findUnique({
          where: { id: postId },
        });
        if (!postCheck) {
          return { ok: false, error: "Post not exist." };
        }
        const postLike = await client.postLike.findUnique({
          where: { userId_postId: { userId: loggedInUser.id, postId } },
        });
        if (!postLike) {
          await client.postLike.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              post: { connect: { id: postId } },
            },
          });
          return { ok: true, error: "connected", id: postId };
        } else {
          await client.postLike.delete({
            where: { userId_postId: { userId: loggedInUser.id, postId } },
          });
          return { ok: true, error: "deleted" };
        }
      }
    ),
  },
};

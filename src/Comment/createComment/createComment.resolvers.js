import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { postId, payload }, { loggedInUser }) => {
        const postCheck = await client.post.findUnique({
          where: { id: postId },
        });
        if (!postCheck) {
          return { ok: false, error: "No Post" };
        }
        const newComment = await client.comment.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            post: { connect: { id: postId } },
            payload,
          },
        });
        return { ok: true, id: newComment.id };
      }
    ),
  },
};

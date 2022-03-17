import { gql } from "apollo-server-core";
import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { commentId }, { loggedInUser }) => {
        const commentCheck = await client.comment.findUnique({
          where: { id: commentId },
        });
        if (!commentCheck) {
          return { ok: false, error: "No Comment" };
        }
        if (commentCheck.userId !== loggedInUser.id) {
          return { ok: false, error: "Not authorized." };
        }
        await client.comment.delete({
          where: { id: commentId },
        });
        return { ok: true };
      }
    ),
  },
};

import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    deletePost: protectedResolver(async (_, { postId }, { loggedInUser }) => {
      const postCheck = await client.post.findFirst({
        where: { id: postId },
        select: { userId: true },
      });
      console.log(postCheck.userId);
      console.log(loggedInUser.id);
      if (!postCheck) {
        return { ok: false, error: "Post not exist." };
      } else if (loggedInUser.id !== postCheck.userId) {
        return { ok: false, error: "Not authorized." };
      } else {
        await client.post.delete({
          where: { id: postId },
        });
      }

      return { ok: true };
    }),
  },
};

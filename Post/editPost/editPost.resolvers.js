import client from "../../client";
import { protectedResolver } from "../../User/user.utils";
import { hashtagProcess } from "../post.utils";

export default {
  Mutation: {
    editPost: protectedResolver(
      async (_, { postId, caption }, { loggedInUser }) => {
        const postCheck = await client.post.findFirst({
          where: { id: postId },
          select: { userId: true },
        });
        if (!postCheck) {
          return { ok: false, error: "Post not exist." };
        } else if (postCheck.userId !== loggedInUser.id) {
          return { ok: false, error: "Not authorized." };
        } else {
          let hashArray = [];
          let hashObj = {};
          if (caption) {
            await client.post.update({
              where: { id: postId },
              data: {
                hashtags: {
                  set: [],
                },
              },
            });
            hashArray = hashtagProcess(caption);
            hashObj = { connectOrCreate: hashArray };
          }

          await client.post.update({
            where: { id: postId },
            data: {
              caption,
              ...(hashArray && {
                hashtags: hashObj,
              }),
            },
          });
        }

        return { ok: true };
      }
    ),
  },
};

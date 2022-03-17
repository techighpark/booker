import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Query: {
    seePost: protectedResolver(
      async (_, { postId }, { loggedInUser }) =>
        await client.post.findUnique({
          where: { id: postId },
          include: {
            user: true,
            book: true,
            hashtags: true,
            likes: true,
            comments: true,
          },
        })
    ),
  },
};

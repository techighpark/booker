import { protectedResolver } from "../user.utils";
import client from "../../client";

export default {
  Mutation: {
    unfollowAuthor: protectedResolver(
      async (_, { authorId }, { loggedInUser }) => {
        const authorCheck = await client.author.findUnique({
          where: { id: authorId },
        });
        if (!authorCheck) {
          return { ok: false, error: "Author not found." };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            followingAuthor: {
              disconnect: { id: authorId },
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};

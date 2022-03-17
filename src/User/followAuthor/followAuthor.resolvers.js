import { protectedResolver } from "../user.utils";
import client from "../../client";

export default {
  Mutation: {
    followAuthor: protectedResolver(
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
              connect: { id: authorId },
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};

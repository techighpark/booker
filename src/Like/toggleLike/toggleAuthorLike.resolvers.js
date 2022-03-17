import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    toggleAuthorLike: protectedResolver(
      async (_, { authorId }, { loggedInUser }) => {
        const authorCheck = await client.author.findUnique({
          where: { id: authorId },
        });
        if (!authorCheck) {
          return { ok: false, error: "Author not exist." };
        }
        const authorLike = await client.authorLike.findUnique({
          where: { userId_authorId: { userId: loggedInUser.id, authorId } },
        });
        if (!authorLike) {
          await client.authorLike.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              author: { connect: { id: authorId } },
            },
          });
          return { ok: true, error: "connected" };
        } else {
          await client.authorLike.delete({
            where: { userId_authorId: { userId: loggedInUser.id, authorId } },
          });
          return { ok: true, error: "deleted" };
        }
      }
    ),
  },
};

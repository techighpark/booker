import { protectedResolver } from "../user.utils";
import client from "../../client";

export default {
  Mutation: {
    unfollowBook: protectedResolver(async (_, { bookId }, { loggedInUser }) => {
      const authorCheck = await client.book.findUnique({
        where: { id: bookId },
      });
      if (!authorCheck) {
        return { ok: false, error: "Author not found." };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          followingBook: {
            disconnect: { id: bookId },
          },
        },
      });
      return { ok: true };
    }),
  },
};

import { protectedResolver } from "../user.utils";
import client from "../../client";

export default {
  Mutation: {
    unfollowBook: protectedResolver(async (_, { bookId }, { loggedInUser }) => {
      const bookCheck = await client.book.findUnique({
        where: { id: bookId },
      });
      if (!bookCheck) {
        return { ok: false, error: "Book not found." };
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

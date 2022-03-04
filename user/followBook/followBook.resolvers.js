import { protectedResolver } from "../user.utils";
import client from "../../client";

export default {
  Mutation: {
    followBook: protectedResolver(async (_, { bookId }, { loggedInUser }) => {
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
            connect: { id: bookId },
          },
        },
      });
      return { ok: true };
    }),
  },
};

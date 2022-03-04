import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    toggleBookLike: protectedResolver(
      async (_, { bookId }, { loggedInUser }) => {
        const bookCheck = await client.book.findUnique({
          where: { id: bookId },
        });
        if (!bookCheck) {
          return { ok: false, error: "Book not exist." };
        }
        const bookLike = await client.bookLike.findUnique({
          where: { userId_bookId: { userId: loggedInUser.id, bookId } },
        });
        if (!bookLike) {
          await client.bookLike.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              book: { connect: { id: bookId } },
            },
          });
          return { ok: true, error: "connected" };
        } else {
          await client.bookLike.delete({
            where: { userId_bookId: { userId: loggedInUser.id, bookId } },
          });
          return { ok: true, error: "deleted" };
        }
      }
    ),
  },
};

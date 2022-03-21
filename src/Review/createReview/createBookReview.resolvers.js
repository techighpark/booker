import { protectedResolver } from "../../User/user.utils";
import client from "../../client";

export default {
  Mutation: {
    createReview: protectedResolver(
      async (_, { review, bookId }, { loggedInUser }) => {
        const bookCheck = await client.book.findUnique({
          where: { id: bookId },
        });
        if (!bookCheck) {
          return { ok: false, error: "Book not found." };
        }
        const reviewCheck = await client.bookReview.findUnique({
          where: { bookId_userId: { bookId, userId: loggedInUser.id } },
        });
        if (reviewCheck) {
          return { ok: false, error: "You alread wrote reivew." };
        }
        await client.bookReview.create({
          data: {
            review,
            user: { connect: { id: loggedInUser.id } },
            book: { connect: { id: bookId } },
          },
        });
        return { ok: true };
      }
    ),
  },
};

import { protectedResolver } from "../../User/user.utils";
import client from "../../client";

export default {
  Mutation: {
    editReview: protectedResolver(
      async (_, { bookId, review }, { loggedInUser }) => {
        const reviewCheck = await client.bookReview.findUnique({
          where: { bookId_userId: { bookId, userId: loggedInUser.id } },
        });
        if (!reviewCheck) {
          return { ok: false, error: "Review not found." };
        }
        await client.bookReview.update({
          where: { bookId_userId: { bookId, userId: loggedInUser.id } },
          data: {
            review,
          },
        });
        return { ok: true };
      }
    ),
  },
};

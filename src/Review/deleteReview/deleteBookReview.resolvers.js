import { protectedResolver } from "../../User/user.utils";
import client from "../../client";

export default {
  Mutation: {
    deleteReview: protectedResolver(async (_, { bookId }, { loggedInUser }) => {
      const reviewCheck = await client.bookReview.findUnique({
        where: { bookId_userId: { bookId, userId: loggedInUser.id } },
      });
      if (!reviewCheck) {
        return { ok: false, error: "Review not found." };
      }
      await client.bookReview.delete({
        where: { bookId_userId: { bookId, userId: loggedInUser.id } },
      });

      return { ok: true };
    }),
  },
};

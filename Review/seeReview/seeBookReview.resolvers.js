import client from "../../client";

export default {
  Query: {
    seeBookReview: (_, { reviewId }) =>
      client.bookReview.findMany({
        where: { id: reviewId },
        include: { user: true },
      }),
  },
};

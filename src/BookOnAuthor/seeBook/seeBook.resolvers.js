import client from "../../client";

export default {
  Query: {
    seeBook: (_, { id }) =>
      client.book.findUnique({
        where: { id },
        include: {
          // author: true,
          follower: true,
          reviews: { include: { book: true } },
        },
      }),
  },
};

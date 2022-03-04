import client from "../../client";

export default {
  Query: {
    seeAuthor: (_, { id }) =>
      client.author.findUnique({
        where: { id },
        include: { books: true },
      }),
  },
};

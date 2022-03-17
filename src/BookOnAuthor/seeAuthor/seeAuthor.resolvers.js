import client from "../../client";

export default {
  Query: {
    seeAuthor: async (_, { fullName }) => {
      const authorCheck = await client.author.findUnique({
        where: { fullName },
        include: { books: true },
      });
      return authorCheck;
    },
  },
};

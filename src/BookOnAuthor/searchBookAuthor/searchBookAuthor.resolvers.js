import client from "../../client";

export default {
  Query: {
    SearchBookAuthor: async (_, { keyword }) => {
      const searchBookResult = await client.book.findMany({
        where: {
          OR: [
            { title: { contains: keyword } },
            { author: { fullName: { contains: keyword } } },
          ],
        },
        include: { author: true },
      });
      const searchAuthorResult = await client.author.findMany({
        where: {
          OR: [
            { fullName: { contains: keyword } },
            { books: { some: { title: { contains: keyword } } } },
          ],
        },
        include: { books: true },
      });
      if (!searchAuthorResult.length && !searchBookResult.length) {
        return { ok: false, error: "There are no result." };
      }
      return { ok: true, books: searchBookResult, authors: searchAuthorResult };
    },
  },
};

import client from "../../client";

export default {
  Query: {
    searchAll: async (_, { keyword }) => {
      const userResults = await client.user.findMany({
        where: {
          OR: [
            { username: { contains: keyword, mode: "insensitive" } },
            { email: { contains: keyword, mode: "insensitive" } },
          ],
        },
      });
      const authorResults = await client.author.findMany({
        where: {
          OR: [
            { fullName: { contains: keyword, mode: "insensitive" } },
            {
              books: {
                some: { title: { contains: keyword, mode: "insensitive" } },
              },
            },
            {
              books: {
                some: { subtitle: { contains: keyword, mode: "insensitive" } },
              },
            },
          ],
        },
      });
      const bookResults = await client.book.findMany({
        where: {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            {
              author: { fullName: { contains: keyword, mode: "insensitive" } },
            },
          ],
        },
      });
      const hashtagResult = await client.hashtag.findMany({
        where: {
          OR: [{ hashtag: { contains: `#${keyword}`, mode: "insensitive" } }],
        },
      });
      return {
        users: userResults,
        authors: authorResults,
        books: bookResults,
        hashtags: hashtagResult,
      };
    },
  },
};

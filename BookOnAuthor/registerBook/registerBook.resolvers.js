import client from "../../client";

export default {
  Mutation: {
    registerBook: async (_, { title, subtitle, publishedAt, authorName }) => {
      const authorCheck = await client.author.findUnique({
        where: { fullName: authorName },
      });
      if (!authorCheck) {
        return {
          ok: false,
          error:
            "Author not found. You need to register author before this action.",
        };
      }

      const bookCheck = await client.book.findMany({
        where: {
          AND: [
            { title: { equals: title } },
            { authorId: { equals: authorCheck.id } },
          ],
        },
      });
      if (bookCheck.length) {
        return { ok: false, error: "Book already registered" };
      }

      await client.book.create({
        data: {
          title,
          subtitle,
          publishedAt,
          author: {
            connect: { fullName: authorName },
          },
        },
        include: {
          author: true,
        },
      });
      return { ok: true };
    },
  },
};

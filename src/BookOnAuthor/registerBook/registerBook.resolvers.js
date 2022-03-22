import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    registerBook: async (
      _,
      { title, subtitle, publishedAt, authorName, bookCover }
    ) => {
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

      let bookCoverUrl = null;
      if (bookCover) {
        bookCoverUrl = await uploadToS3(
          bookCover,
          "administrator",
          "bookCover"
        );
      }
      await client.book.create({
        data: {
          title,
          subtitle,
          publishedAt,
          author: {
            connect: { fullName: authorName },
          },
          ...(bookCoverUrl && { bookCover: bookCoverUrl }),
        },
        include: {
          author: true,
        },
      });
      return { ok: true };
    },
  },
};

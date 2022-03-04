import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editBook: async (_, { id, title, subtitle, publishedAt, bookCover }) => {
      const bookCheck = await client.book.findUnique({ where: { id } });
      if (!bookCheck) {
        return { ok: false, error: "Book not found." };
      }
      let bookCoverUrl = null;
      if (bookCover) {
        bookCoverUrl = await uploadToS3(
          bookCover,
          "administrator",
          "bookCover"
        );
      }

      await client.book.update({
        where: { id },
        data: {
          title,
          subtitle,
          publishedAt,
          ...(bookCoverUrl && { bookCover: bookCoverUrl }),
        },
      });
      return { ok: true };
    },
  },
};

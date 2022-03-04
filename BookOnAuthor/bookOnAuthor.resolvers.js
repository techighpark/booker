import client from "../client";

export default {
  Author: {
    totalBooks: ({ id }) =>
      client.author.count({ where: { books: { some: { authorId: id } } } }),
  },
  Book: {
    totalReviews: ({ id }) =>
      client.bookReview.count({ where: { bookId: id } }),
    totalFollower: ({ id }) =>
      client.user.count({ where: { followingBook: { some: { id } } } }),
  },
};

import client from "../client";
import { protectedResolver } from "../User/user.utils";

export default {
  Author: {
    totalBooks: ({ id }) => client.book.count({ where: { authorId: id } }),
    totalFollower: ({ id }) =>
      client.user.count({ where: { followingAuthor: { some: { id } } } }),
    follower: ({ id }) =>
      client.user.findMany({ where: { followingAuthor: { some: { id } } } }),
    isFollowing: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const authorCheck = await client.author.findFirst({
        where: {
          AND: [{ id }, { follower: { some: { id: loggedInUser.id } } }],
        },
      });
      return Boolean(authorCheck);
    }),
    isLiked: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const authorCheck = await client.authorLike.findFirst({
        where: { AND: [{ authorId: id }, { userId: loggedInUser.id }] },
      });
      return Boolean(authorCheck);
    }),
    totalLikes: ({ id }) =>
      client.authorLike.count({ where: { authorId: id } }),
  },
  Book: {
    totalReviews: ({ id }) =>
      client.bookReview.count({ where: { bookId: id } }),
    totalFollower: ({ id }) =>
      client.user.count({ where: { followingBook: { some: { id } } } }),
    author: ({ id }) =>
      client.author.findFirst({ where: { books: { some: { id } } } }),
    isFollowing: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const bookCheck = await client.book.findFirst({
        where: {
          AND: [{ id }, { follower: { some: { id: loggedInUser.id } } }],
        },
      });
      return Boolean(bookCheck);
    }),
    isLiked: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const bookCheck = await client.bookLike.findFirst({
        where: { AND: [{ bookId: id }, { userId: loggedInUser.id }] },
      });
      return Boolean(bookCheck);
    }),
    totalLikes: ({ id }) => client.bookLike.count({ where: { bookId: id } }),
  },
};

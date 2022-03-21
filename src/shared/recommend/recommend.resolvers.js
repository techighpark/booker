import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Query: {
    recommend: protectedResolver(async (_, __, { loggedInUser }) => {
      const userCheck = await client.user.findMany({
        where: { followerUser: { some: { id: loggedInUser.id } } },
      });
      const userCheckId = userCheck.map(user => user.id);

      const userBookRecommend = await client.book.findMany({
        where: { follower: { some: { id: { in: userCheckId } } } },
      });

      const userAuthorRecommend = await client.author.findMany({
        where: { follower: { some: { id: { in: userCheckId } } } },
      });

      const userUserRecommend = await client.user.findMany({
        where: { followerUser: { some: { id: { in: userCheckId } } } },
      });

      const userAuthorRecommendId = userAuthorRecommend.map(
        author => author.id
      );

      const userAuthorBookRecommend = await client.book.findMany({
        where: { authorId: { in: userAuthorRecommendId } },
      });

      const userBookRecommendId = userBookRecommend.map(book => book.id);

      const userBookAuthorrecommend = await client.author.findMany({
        where: { books: { some: { id: { in: userBookRecommendId } } } },
      });

      const recommendBook = userBookRecommend.concat(userAuthorBookRecommend);
      const filteredRecommendBook = [
        ...new Set(recommendBook.map(JSON.stringify)),
      ].map(JSON.parse);
      const recommendAuthor = userAuthorRecommend.concat(
        userBookAuthorrecommend
      );
      const filterdRecommnedAuthor = [
        ...new Set(recommendAuthor.map(JSON.stringify)),
      ].map(JSON.parse);
      return {
        books: filteredRecommendBook,
        authors: filterdRecommnedAuthor,
        users: userUserRecommend,
      };
    }),
  },
};

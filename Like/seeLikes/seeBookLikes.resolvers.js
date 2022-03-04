import client from "../../client";

export default {
  Query: {
    seeAuthorLikes: (_, { AuthorId }) =>
      client.user.findMany({
        where: { authorLikes: { some: { AuthorId } } },
      }),
  },
};

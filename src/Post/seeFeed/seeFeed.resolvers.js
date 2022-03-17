import { protectedResolver } from "../../User/user.utils";
import client from "../../client";

export default {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser }) =>
      client.post.findMany({
        where: {
          OR: [
            { user: { followerUser: { some: { id: loggedInUser.id } } } },
            { user: { id: loggedInUser.id } },
          ],
        },
        include: {
          user: true,
          book: true,
          hashtags: true,
          likes: true,
          comments: true,
        },
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};

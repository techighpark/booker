import { protectedResolver } from "../../User/user.utils";
import client from "../../client";

export default {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser }) =>
      client.post.findMany({
        where: {
          OR: [
            { user: { followingUser: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};

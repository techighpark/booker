import client from "../client";
import { protectedResolver } from "./user.utils";

export default {
  User: {
    totalFollowerUser: ({ id }) => {
      return client.user.count({
        where: { followingUser: { some: { id } } },
      });
    },
    totalFollowingUser: ({ id }) => {
      return client.user.count({
        where: { followerUser: { some: { id } } },
      });
    },
    isFollowing: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const userCheck = await client.user.count({
        where: {
          AND: [{ id: loggedInUser.id }, { followingUser: { some: { id } } }],
        },
      });
      return Boolean(userCheck);
    }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return Boolean(id === loggedInUser.id);
    },
    totalFollowingBook: ({ id }) =>
      client.book.count({ where: { follower: { some: { id } } } }),
    totalFollowingAuthor: ({ id }) =>
      client.author.count({ where: { follower: { some: { id } } } }),
    // rooms: ({ id }) => {
    //   client.room.findMany({ where: { users: { some: { id } } } });
    // },
    posts: ({ id }) =>
      client.post.findMany({
        where: { userId: id },
        orderBy: { createdAt: "desc" },
      }),
  },
};

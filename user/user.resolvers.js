import client from "../client";

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
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const userCheck = await client.user.count({
        where: {
          AND: [{ id: loggedInUser.id }, { followingUser: { some: { id } } }],
        },
      });
      return Boolean(userCheck);
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return Boolean(id === loggedInUser.id);
    },
    // rooms: ({ id }) => {
    //   client.room.findMany({ where: { users: { some: { id } } } });
    // },
  },
};

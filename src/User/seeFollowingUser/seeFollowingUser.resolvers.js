import client from "../../client";

export default {
  Query: {
    seeFollowingUser: async (_, { username, lastId }) => {
      const userCheck = await client.user.findUnique({ where: { username } });
      if (!userCheck) {
        return { ok: false, error: "User not found" };
      }
      const followingUser = await client.user.findMany({
        where: { followerUser: { some: { username } } },
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return { ok: true, followingUser };
    },
  },
};

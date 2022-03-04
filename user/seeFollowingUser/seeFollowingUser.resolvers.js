import client from "../../client";

export default {
  Query: {
    seeFollowingUser: async (_, { username }) => {
      const userCheck = await client.user.findUnique({ where: { username } });
      if (!userCheck) {
        return { ok: false, error: "User not found" };
      }
      const followingUser = await client.user.findMany({
        where: { followerUser: { some: { username } } },
      });
      return { ok: true, followingUser };
    },
  },
};

import client from "../../client";

export default {
  Query: {
    seeFollowerUser: async (_, { username }) => {
      const userCheck = await client.user.findUnique({ where: { username } });
      if (!userCheck) {
        return { ok: false, error: "User not found" };
      }
      const followerUser = await client.user.findMany({
        where: { followingUser: { some: { username } } },
      });
      return { ok: true, followerUser };
    },
  },
};

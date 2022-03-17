import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userId }, { loggedInUser }) => {
      const followUserCheck = await client.user.findUnique({
        where: { id: userId },
      });
      if (!followUserCheck) {
        return { ok: false, error: "User not found." };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: { followingUser: { connect: { id: userId } } },
      });
      return { ok: true };
    }),
  },
};

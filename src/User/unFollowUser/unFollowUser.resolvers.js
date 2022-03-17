import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
  Mutation: {
    unFollowUser: protectedResolver(async (_, { userId }, { loggedInUser }) => {
      const unFollowUserCheck = await client.user.findUnique({
        where: { id: userId },
      });
      if (!unFollowUserCheck) {
        return { ok: false, error: "User not found." };
      }
      await client.user.update({
        where: { id: loggedInUser.id },
        data: { followingUser: { disconnect: { id: userId } } },
      });
      return { ok: true };
    }),
  },
};

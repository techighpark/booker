import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, { roomId }, { loggedInUser }) => {
      const roomCheck = await client.room.findUnique({ where: { id: roomId } });
      if (!roomCheck) {
        return null;
      }
      return await client.room.findFirst({
        where: { id: roomId, users: { some: { id: loggedInUser.id } } },
      });
    }),
  },
};

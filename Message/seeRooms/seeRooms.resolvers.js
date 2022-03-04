import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Query: {
    seeRooms: protectedResolver((_, __, { loggedInUser }) => {
      return client.room.findMany({
        where: { users: { some: { id: loggedInUser.id } } },
      });
    }),
  },
};

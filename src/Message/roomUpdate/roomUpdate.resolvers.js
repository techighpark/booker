import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constant";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../User/user.utils";

export default {
  Subscription: {
    roomUpdate: {
      subscribe: protectedResolver(
        async (root, args, { loggedInUser }, info) => {
          const roomCheck = await client.room.findFirst({
            where: {
              id: args.roomId,
              users: { some: { id: loggedInUser.id } },
            },
          });
          if (!roomCheck) {
            throw new Error("There is no room.");
          }
          return withFilter(
            () => pubsub.asyncIterator(NEW_MESSAGE),
            async (root, args, { loggedInUser }) => {
              if (root.roomUpdate.roomId === args.roomId) {
                const roomCheck = await client.room.findFirst({
                  where: {
                    id: args.roomId,
                    users: { some: { id: loggedInUser.id } },
                  },
                });
                if (!roomCheck) {
                  return false;
                }
                return true;
              }
            }
          )(root, args, { loggedInUser }, info);
        }
      ),
    },
  },
};

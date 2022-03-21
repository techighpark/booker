import client from "../../client";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { messageId }, { loggedInUser }) => {
        const messageCheck = await client.message.findFirst({
          where: {
            id: messageId,
            userId: { not: loggedInUser.id },
            room: { users: { some: { id: loggedInUser.id } } },
          },
          select: { id: true },
        });
        if (!messageCheck) {
          return { ok: false, error: "Message not found." };
        }
        await client.message.update({
          where: { id: messageId },
          data: {
            read: true,
          },
        });
        return { ok: true };
      }
    ),
  },
};

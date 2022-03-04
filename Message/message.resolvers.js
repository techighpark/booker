import client from "../client";

export default {
  Room: {
    messages: ({ id }) => client.message.findMany({ where: { roomId: id } }),
    users: ({ id }) =>
      client.user.findMany({
        where: { rooms: { some: { id } } },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return client.message.count({
          where: {
            read: false,
            roomId: id,
            user: { id: { not: loggedInUser.id } },
          },
        });
      }
    },
  },
  Message: {
    user: ({ id }) =>
      client.user.findFirst({ where: { messages: { some: { id } } } }),
    isMine: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const messageUser = await client.user.findFirst({
        where: { messages: { some: { id } } },
      });
      if (messageUser.id === loggedInUser.id) {
        return true;
      } else {
        return false;
      }
    },
  },
};

import client from "../../client";
import { NEW_MESSAGE } from "../../constant";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../User/user.utils";

export default {
  Mutation: {
    sendMessageCreateRoom: protectedResolver(
      async (_, { userId, roomId, payload }, { loggedInUser }) => {
        let room = null;
        if (userId) {
          const userCheckArray = await Promise.all(
            userId.map(id => client.user.findUnique({ where: { id } }))
          );
          const userCheck = userCheckArray.filter(user => user === null);
          if (userCheck.length !== 0) {
            return { ok: false, error: "User not found." };
          }
          let connectUsers = userId.map(id => {
            return { id: id };
          });
          connectUsers.push({ id: loggedInUser.id });

          room = await client.room.create({
            data: {
              users: { connect: connectUsers },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
          });
          if (!room) {
            return { ok: false, error: "No room anymore." };
          }
        }

        const newMessage = await client.message.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            room: { connect: { id: room.id } },
            payload,
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdate: { ...newMessage } });
        return { ok: true };
      }
    ),
  },
};
//  보낼때마다 새로운 방이 생성됨.... 방 찾아서 중복 안되도록 해야함...
// 아니지..? 이건 create 니깐 계속해서 만들수 있는거임?
// 흠....

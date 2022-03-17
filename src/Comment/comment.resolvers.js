import client from "../client";
import { protectedResolver } from "../User/user.utils";

export default {
  Comment: {
    user: ({ id }) =>
      client.user.findFirst({ where: { comment: { some: { id } } } }),
    isMine: protectedResolver(async ({ id }, _, { loggedInUser }) => {
      const commentCheck = await client.comment.findFirst({
        where: { AND: [{ id }, { user: { id: loggedInUser.id } }] },
      });
      return Boolean(commentCheck);
    }),
  },
};

import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      const checkUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      if (checkUser) {
        return { ok: false, error: "Username or Email is already taken." };
      }

      const hashPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          email,
          password: hashPassword,
        },
      });
      return { ok: true };
    },
  },
};

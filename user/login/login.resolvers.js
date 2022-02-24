import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const userOk = await client.user.findUnique({
        where: { username },
      });
      if (!userOk) {
        return { ok: false, error: "User not found." };
      }
      const passwordOk = await bcrypt.compare(password, userOk.password);
      if (!passwordOk) {
        return { ok: false, error: "Password incorrect. " };
      }
      const token = jwt.sign({ id: userOk.id }, process.env.RANDOM_KEY);

      return { ok: true, token };
    },
  },
};

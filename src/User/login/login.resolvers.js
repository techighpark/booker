import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const userCheck = await client.user.findUnique({
        where: { username },
      });
      if (!userCheck) {
        return { ok: false, error: "User not found." };
      }
      const passwordOk = await bcrypt.compare(password, userCheck.password);
      if (!passwordOk) {
        return { ok: false, error: "Password incorrect. " };
      }
      const token = jwt.sign({ id: userCheck.id }, process.env.RANDOM_KEY);
      return { ok: true, token };
    },
  },
};

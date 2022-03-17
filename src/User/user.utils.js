import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async token => {
  try {
    if (!token) {
      return null;
    }
    const tokenOk = jwt.verify(token, process.env.RANDOM_KEY);
    const userCheck = await client.user.findUnique({
      where: { id: tokenOk.id },
    });
    if (userCheck) {
      return userCheck;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver = resolver => (parent, args, context, info) => {
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return { ok: false, error: "Please log in to do this action." };
    }
  }
  return resolver(parent, args, context, info);
};

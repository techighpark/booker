import jwt from "jsonwebtoken";
import client from "../client";

export async function getUser(token) {
  if (!token) {
    return null;
  }
  const tokenOk = jwt.verify(token, process.env.RANDOM_KEY);
  const user = await client.user.findUnique({
    where: { id: tokenOk.id },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}

export const protectedResolver =
  (resolver) => (parent, args, context, info) => {
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

import client from "../../client";

export default {
  Query: {
    seePost: (_, { id }) => client.post.findUnique({ where: { id } }),
  },
};

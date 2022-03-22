import client from "../../client";

export default {
  Query: {
    seeBooks: () => client.book.findMany({ include: { author: true } }),
  },
};

import client from "../../client";

export default {
  Query: {
    seeAuthors: () => client.author.findMany(),
  },
};

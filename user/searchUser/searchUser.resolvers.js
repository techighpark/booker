import client from "../../client";

export default {
  Query: {
    searchUser: async (_, { keyword }) => {
      const searchResult = await client.user.findMany({
        where: {
          OR: [
            { username: { contains: keyword.toLowerCase() } },
            { email: { contains: keyword.toLowerCase() } },
          ],
        },
      });

      return searchResult;
    },
  },
};

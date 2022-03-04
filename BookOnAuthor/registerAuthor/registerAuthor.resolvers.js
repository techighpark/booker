import client from "../../client";

export default {
  Mutation: {
    registerAuthor: async (_, { fullName, nationality, birth }) => {
      const regex = /^[a-zA-Z][a-zA-Z ]*$/gi;
      const fullNameCheck = regex.test(fullName);
      const authorCheck = await client.author.findFirst({
        where: { fullName },
      });
      if (authorCheck) {
        return { ok: false, error: "Author is already registerd." };
      }
      if (!fullNameCheck) {
        return { ok: false, error: "Author name should be English only." };
      }
      await client.author.create({
        data: {
          fullName,
          nationality,
          birth,
        },
      });
      return { ok: true };
    },
  },
};

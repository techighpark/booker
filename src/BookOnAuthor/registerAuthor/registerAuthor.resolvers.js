import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    registerAuthor: async (
      _,
      { fullName, nationality, birth, photoProfile }
    ) => {
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
      let photoProfileUrl = null;
      if (photoProfile) {
        photoProfileUrl = await uploadToS3(
          photoProfile,
          "administrator",
          "authorPhotoProfile"
        );
      }
      await client.author.create({
        data: {
          fullName,
          nationality,
          ...(birth && { birth: birth }),
          ...(photoProfileUrl && { photoProfile: photoProfileUrl }),
        },
      });
      return { ok: true };
    },
  },
};

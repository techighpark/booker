import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editAuthor: async (
      _,
      { id, fullName, nationality, birth, photoProfile }
    ) => {
      const authorCheck = await client.author.findUnique({
        where: { id },
      });
      if (!authorCheck) {
        return { ok: false, error: "Author not found." };
      }
      let photoProfileUrl = null;
      if (photoProfile) {
        photoProfileUrl = await uploadToS3(
          photoProfile,
          "administrator",
          "authorPhotoProfile"
        );
      }
      await client.author.update({
        where: { id },
        data: {
          fullName,
          nationality,
          birth,
          ...(photoProfileUrl && { photoProfile: photoProfileUrl }),
        },
      });
      return { ok: true };
    },
  },
};

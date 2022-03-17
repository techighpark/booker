import client from "../../client";
import { protectedResolver } from "../../User/user.utils";
import { hashtagProcess } from "../post.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    uploadPost: protectedResolver(
      async (_, { photo, caption, bookId }, { loggedInUser }) => {
        const postCheck = await client.post.findUnique({
          where: { bookId_userId: { bookId, userId: loggedInUser.id } },
        });
        if (postCheck) {
          return { ok: false, error: "You already posted about this book." };
        }

        let photoUrl = null;
        if (photo) {
          photoUrl = await uploadToS3(photo, loggedInUser.id, "postPhoto");
        }
        let hashObj = [];
        if (caption) {
          hashObj = hashtagProcess(caption);
        }
        await client.post.create({
          data: {
            ...(photoUrl && { photo: photoUrl }),
            caption,
            book: {
              connect: { id: bookId },
            },
            user: {
              connect: { id: loggedInUser.id },
            },
            ...(hashObj && {
              hashtags: {
                connectOrCreate: hashObj,
              },
            }),
          },
        });
        return { ok: true };
      }
    ),
  },
};

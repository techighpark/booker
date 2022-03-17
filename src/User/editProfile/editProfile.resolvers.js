import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../user.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, password, bio, avatar },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "userAvatar");
          /* const { createReadStream, filename } = await avatar;
          let { name, ext } = parse(filename);
          name = name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_");
          let serverFile = `${name}-${Date.now()}-${ext}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/avatar/" + serverFile
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${serverFile}`; */
        }

        if (!loggedInUser) {
          return { ok: false, error: "No Authentification, please log in." };
        }
        let hashPassword = null;
        if (password) {
          hashPassword = await bcrypt.hash(password, 10);
        }

        const currentUser = await client.user.findUnique({
          where: { id: loggedInUser.id },
        });
        const checkUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });

        if (checkUser) {
          if (checkUser.id !== currentUser.id) {
            return { ok: false, error: "Username or Email is already taken." };
          }
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            bio,
            ...(hashPassword && { password: hashPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (updatedUser) {
          return { ok: true };
        } else {
          return { ok: false, error: "Could not update profile." };
        }
      }
    ),
  },
};

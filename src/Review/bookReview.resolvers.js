import { protectedResolver } from "../User/user.utils";

export default {
  BookReview: {
    isMyReview: protectedResolver(({ user }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      if (user.id === loggedInUser.id) {
        return true;
      } else {
        false;
      }
    }),
  },
};

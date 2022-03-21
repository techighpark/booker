import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingUserMutation {
    ok: Boolean!
    error: String
    followingUser: [User]
  }
  type Query {
    seeFollowingUser(username: String!, lastId: Int): SeeFollowingUserMutation!
  }
`;

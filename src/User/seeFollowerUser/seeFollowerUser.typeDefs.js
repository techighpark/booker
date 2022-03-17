import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowerUserResult {
    ok: Boolean!
    error: String
    followerUser: [User]
  }
  type Query {
    seeFollowerUser(username: String!): SeeFollowerUserResult!
  }
`;

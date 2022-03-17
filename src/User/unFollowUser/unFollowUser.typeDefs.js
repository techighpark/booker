import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    unFollowUser(userId: Int!): MutationResult!
  }
`;

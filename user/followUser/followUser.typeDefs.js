import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    followUser(userId: Int!): MutationResult!
  }
`;

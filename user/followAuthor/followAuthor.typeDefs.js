import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    followAuthor(authorId: Int!): MutationResult!
  }
`;

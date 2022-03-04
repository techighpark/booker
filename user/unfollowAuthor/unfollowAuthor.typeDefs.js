import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unfollowAuthor(authorId: Int!): MutationResult!
  }
`;

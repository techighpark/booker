import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    togglePostLike(postId: Int!): MutationResult!
    toggleBookLike(bookId: Int!): MutationResult!
    toggleAuthorLike(authorId: Int!): MutationResult!
  }
`;

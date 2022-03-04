import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createReview(review: String!, bookId: Int!): MutationResult!
  }
`;

import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteReview(bookId: Int!): MutationResult!
  }
`;

import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editReview(bookId: Int!, review: String!): MutationResult!
  }
`;

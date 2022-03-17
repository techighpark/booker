import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeBookReview(reviewId: Int!): [BookReview]!
  }
`;

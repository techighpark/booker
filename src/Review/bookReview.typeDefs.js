import { gql } from "apollo-server-express";

export default gql`
  type BookReview {
    id: Int!
    review: String!
    user: User!
    book: Book!
    isMyReview: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

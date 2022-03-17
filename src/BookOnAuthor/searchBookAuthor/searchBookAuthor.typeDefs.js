import { gql } from "apollo-server-express";

export default gql`
  type SearchBookAuthorResult {
    ok: Boolean!
    error: String
    books: [Book]
    authors: [Author]
  }
  type Query {
    SearchBookAuthor(keyword: String!): SearchBookAuthorResult!
  }
`;

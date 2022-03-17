import { gql } from "apollo-server-express";

export default gql`
  type SearchResult {
    users: [User]
    books: [Book]
    authors: [Author]
    hashtags: [Hashtag]
  }
  type Query {
    searchAll(keyword: String): SearchResult
  }
`;

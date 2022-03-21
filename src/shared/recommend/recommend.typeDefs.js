import { gql } from "apollo-server-core";

export default gql`
  type RecommendResult {
    users: [User]
    books: [Book]
    authors: [Author]
  }
  type Query {
    recommend: RecommendResult
  }
`;

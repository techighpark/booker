import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    registerBook(
      title: String!
      subtitle: String
      publishedAt: String
      authorName: String!
      genres: [String]
      bookCover: Upload
    ): MutationResult!
  }
`;

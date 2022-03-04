import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    registerBook(
      title: String!
      subtitle: String
      publishedAt: Int
      authorName: String!
      authorBirth: Int
      authorNationality: String
      genres: [String]
    ): MutationResult!
  }
`;

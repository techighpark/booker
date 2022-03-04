import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editBook(
      id: Int!
      title: String
      subtitle: String
      publishedAt: String
      bookCover: Upload
    ): MutationResult!
  }
`;

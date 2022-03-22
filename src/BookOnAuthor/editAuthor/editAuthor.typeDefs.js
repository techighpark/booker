import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editAuthor(
      id: Int!
      fullName: String
      nationality: String
      birth: String
      photoProfile: Upload
    ): MutationResult!
  }
`;

import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    registerAuthor(
      fullName: String!
      nationality: String
      birth: Int
    ): MutationResult!
  }
`;

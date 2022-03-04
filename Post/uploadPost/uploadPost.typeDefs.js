import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    uploadPost(photo: Upload!, caption: String, bookId: Int!): MutationResult!
  }
`;

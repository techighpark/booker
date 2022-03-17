import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editPost(postId: Int!, caption: String): MutationResult!
  }
`;

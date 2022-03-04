import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deletePost(postId: Int!): MutationResult!
  }
`;

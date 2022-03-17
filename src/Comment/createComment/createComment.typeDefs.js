import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createComment(postId: Int!, payload: String!): MutationResult!
  }
`;

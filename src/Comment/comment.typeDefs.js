import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    payload: String!
    user: User!
    post: Post!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

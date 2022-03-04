import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePostLikes(postId: Int!): [User]
    seeBookLikes(bookId: Int!): [User]
    seeAuthorLikes(authorId: Int!): [User]
  }
`;

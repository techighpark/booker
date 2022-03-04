import { gql } from "apollo-server-core";

export default gql`
  type PostLike {
    id: Int!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }
  type BookLike {
    id: Int!
    user: User!
    book: Book!
    createdAt: String!
    updatedAt: String!
  }
  type AuthorLike {
    id: Int!
    user: User!
    author: Author!
    createdAt: String!
    updatedAt: String!
  }
`;

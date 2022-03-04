import { gql } from "apollo-server-core";

export default gql`
  type Post {
    id: Int!
    photo: String!
    user: User!
    book: Book!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    createdAt: String!
    updatedAt: String!
  }
`;

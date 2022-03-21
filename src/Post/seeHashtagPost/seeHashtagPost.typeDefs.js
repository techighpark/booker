import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeHashtagPost(hashtag: String!): [Post]
  }
`;

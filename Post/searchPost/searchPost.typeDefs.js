import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchPost(keyword: String!): [Post]!
  }
`;

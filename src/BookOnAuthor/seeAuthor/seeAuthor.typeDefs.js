import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeAuthor(fullName: String!): Author!
  }
`;

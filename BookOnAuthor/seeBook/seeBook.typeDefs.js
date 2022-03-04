import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeBook(id: Int!): Book!
  }
`;

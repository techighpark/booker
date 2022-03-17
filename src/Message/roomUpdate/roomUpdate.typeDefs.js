import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    roomUpdate(roomId: Int!): Message
  }
`;

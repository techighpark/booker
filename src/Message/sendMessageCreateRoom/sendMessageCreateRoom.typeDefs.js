import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    sendMessageCreateRoom(
      userId: [Int]
      roomId: Int
      payload: String!
    ): MutationResult!
  }
`;

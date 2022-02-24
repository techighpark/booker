import { gql } from "apollo-server";

export default gql`
  type mutationResult {
    ok: Boolean!
    id: Int
    error: String
    token: String
  }
`;

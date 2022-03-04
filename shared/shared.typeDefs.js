import { gql } from "apollo-server";

export default gql`
  type MutationResult {
    ok: Boolean!
    id: Int
    error: String
    token: String
  }
`;

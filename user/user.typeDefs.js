import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    bio: String
    avatar: String
    followingUser: [User]!
    followerUser: [User]!
    followingAuthor: [Author]!
    followingBook: [Book]!
    totalFollowerUser: Int!
    totalFollowingUser: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    bookReviews: [BookReview]
    isMyReview: Boolean!
    rooms: [Room]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;

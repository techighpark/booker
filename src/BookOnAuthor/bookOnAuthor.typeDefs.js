import { gql } from "apollo-server-express";

export default gql`
  type Author {
    id: Int!
    fullName: String!
    nationality: String
    birth: String
    photoProfile: String
    books: [Book]
    genres: [Genre]
    follower: [User]
    totalBooks: Int!
    totalFollower: Int!
    isFollowing: Boolean!
    totalLikes: Int!
    isLiked: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Book {
    id: Int!
    title: String!
    subtitle: String
    publishedAt: String
    bookCover: String
    author: Author!
    genres: [Genre]
    follower: [User]
    reviews: [BookReview]
    isLiked: Boolean!
    totalLikes: Int!
    totalReviews: Int!
    totalFollower: Int!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Genre {
    id: Int!
    genre: String!
    books: [Book]
    authors: [Author]!
  }
`;

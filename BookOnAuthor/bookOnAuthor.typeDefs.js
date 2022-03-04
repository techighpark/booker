import { gql } from "apollo-server-express";

export default gql`
  type Author {
    id: Int!
    fullName: String!
    nationality: String
    birth: Int
    photoProfile: String
    books: [Book]
    genres: [Genre]
    follower: [User]
    totalBooks: Int
    createdAt: String!
    updatedAt: String!
  }
  type Book {
    id: Int!
    title: String!
    subtitle: String
    publishedAt: Int
    bookCover: String
    author: Author!
    genres: [Genre]
    follower: [User]
    reviews: [BookReview]
    totalReviews: Int!
    totalFollower: Int!
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

import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
  }

  type Query {
    getBook(id: ID): Book
    getBooks(name: String, genre: String, author: ID): [Book]
    getAuthor(id: ID): Author
    getAuthors(name: String, age: Int): [Author]
  }
  type Mutation {
    addAuthor(name: String, age: Int): Author
    addBook(name: String, genre: String, author: ID): Book
  }
`;

export default typeDefs;

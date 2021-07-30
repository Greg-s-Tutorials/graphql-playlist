import Book from "../models/book";
import Author from "../models/author";

const getQuery = (args) => {
  const query = {};
  Object.entries(args).forEach((arg) => {
    if (arg[1]) query[arg[0]] = arg[1];
  });
  return query;
};

const resolvers = {
  Query: {
    getBook: async (parent, { id }) => {
      const book = await Book.findById(id);
      return book;
    },
    getBooks: async (parent, args) => {
      return await Book.find(getQuery(args));
    },
    getAuthor: async (parent, { id }) => {
      return await Author.findById(id);
    },
    getAuthors(parent, args) {
      return Author.find(getQuery(args));
    },
  },
  Mutation: {
    addAuthor: async (parent, { name, age }) => {
      const author = new Author({
        name: name,
        age: age,
      });
      return await author.save();
    },
    addBook: async (parent, { name, genre, author }) => {
      const book = new Book({
        name: name,
        genre: genre,
        author: author,
      });
      return await book.save();
    },
  },
};

export default resolvers;

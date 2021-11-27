import { ApolloServer, AuthenticationError, gql, UserInputError } from "apollo-server"
import Book from "./models/book.js"
import Author from "./models/author.js"
import User from "./models/user.js"
import dotenv from "dotenv"
dotenv.config()
import "./db.js"
import jwt from "jsonwebtoken"

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: String!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int!
    ): Author
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async () => await Book.find({}),
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.user
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { user } = context
      if (!user) throw new AuthenticationError("not authenticated.")
      const book = new Book({ ...args })
      try {
        return await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const { user } = context
      if (!user) throw new AuthenticationError("not authenticated.")
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ name: args.name })
      if (!user || args.password !== "password") {
        throw new UserInputError("wrong credentials.")
      }
      const token = {
        username: user.username,
        id: user._id
      }
      return {
        value: jwt.sign(token, process.env.JWT_SECRET)
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (!req) {
      return null
    }
    const auth = req.headers.authorization ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7)
      const { id } = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(id)
      if (!user) {
        return null
      }
      return { user }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

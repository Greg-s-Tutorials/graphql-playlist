import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { ApolloServer } from "apollo-server-express";
import typeDefs from './schema/typeDefs'
import resolvers from "./schema/resolvers";
import connectDB from "./config/dbConnector";
// Load env vars:
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();

  server.applyMiddleware({
    app,
    path: "/",
  });

  // Connect database
  await connectDB();

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);

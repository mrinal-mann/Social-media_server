// app.js
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "../clients/db";
import { User } from "./user";
import cors from "cors";
export async function initServer() {
  const app = express();

  // Use Express's built-in JSON middleware
  app.use(express.json());
  app.use(cors());

  const graphqlServer = new ApolloServer({
    typeDefs: `
    ${User.types}
    type Query {
      ${User.queries}
    }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  // Correctly start the Apollo Server
  await graphqlServer.start();

  // Apply the Apollo GraphQL middleware
  app.use("/graphql", express.json(), expressMiddleware(graphqlServer));

  return app;
}

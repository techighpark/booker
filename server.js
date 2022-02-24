require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import path from "path";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/user.utils";

const PORT = process.env.PORT;

async function startApolloServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.token),
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apollo.start();

  const app = express();

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("avatar"));
  apollo.applyMiddleware({ app, path: "/graphql" });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${apollo.graphqlPath}`);
  return { apollo, app };
}
startApolloServer();

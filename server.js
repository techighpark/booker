require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import { schema } from "./schema";
import { getUser } from "./user/user.utils";

import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const PORT = process.env.PORT;
async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ctx => {
        console.log("Connected!");
        const { token } = ctx;
        if (!token) {
          throw new Error("Please log in to do this action.");
        }
        return { loggedInUser: await getUser(ctx.token) };
      },
      onDisconnect(ctx, code, reason) {
        console.log("Disconnected!");
      },
    },
    { server: httpServer, path: "/graphql" }
  );

  const apollo = new ApolloServer({
    schema,
    context: async ctx => {
      if (ctx.req) {
        return { loggedInUser: await getUser(ctx.req.headers.token) };
      } else {
        console.log(ctx);
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apollo.start();
  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  apollo.applyMiddleware({ app, path: "/graphql" });

  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${apollo.graphqlPath}`
    );
  });
}
startServer();

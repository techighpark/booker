import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = mergeResolvers(loadedResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const laodedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(laodedResolvers);

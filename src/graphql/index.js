import { GraphQLSchema } from 'graphql';
import MutationType from './mutation/mutation.index.js';
import QueryType from './query/query.index.js';

export const graphQLSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

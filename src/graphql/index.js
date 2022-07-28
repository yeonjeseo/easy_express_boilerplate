import { GraphQLSchema } from 'graphql';
import MutationType from './mutation/mutation.index.js';
import QueryType from './query/query.index.js';
// const queryType = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     hello: {
//       type: GraphQLString,
//       resolve: () => 'Hello world!',
//     },
//   },
// });
export const graphQLSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

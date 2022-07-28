import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { getAllUsers } from './users/users.query.resolvers.js';
import { UserType } from './users/users.query.types.js';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello world!',
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await getAllUsers(),
    },
  },
});

export default QueryType;

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { loginGraphql } from './authentications.mutations.resolvers.js';

export const loginTypeConfig = {
  name: 'login',
  description: 'login with graphql mutation',
  type: GraphQLString,
  args: {
    account: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, args, context) => loginGraphql(args, context.authenticate),
};

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { createUser } from './users.mutation.resolvers.js';

export const SignupUserTypeConfig = {
  name: 'Signup',
  description: 'mutation for signup',
  type: GraphQLString,
  args: {
    account: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, args, context, info) => {
    const { account, name, password } = args;

    const result = await createUser(account, name, password);

    return result;
  },
};

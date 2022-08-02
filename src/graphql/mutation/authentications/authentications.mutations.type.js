import { GraphQLNonNull, GraphQLString } from 'graphql';
import { publishToken } from '../../../services/authenticate.service.js';

export const loginTypeConfig = {
  name: 'login',
  description: 'login with graphql mutation',
  type: GraphQLString,
  args: {
    account: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (root, args, context) => {
    const { account, password } = args;

    const { user, info } = await context.authenticate('graphql-local', {
      account,
      password,
    });

    if (user === false || user === true) return info.message;
    const tokens = await publishToken(user);

    return JSON.stringify(tokens);
  },
};

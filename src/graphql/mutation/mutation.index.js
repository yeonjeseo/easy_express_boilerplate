import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';
import { publishToken } from '../../services/authenticate.service.js';
import { SignupUserTypeConfig } from './users/users.mutation.types.js';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signupUser: SignupUserTypeConfig,
    login: {
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
    },
  },
});
export default MutationType;

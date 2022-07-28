import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
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
      resolve: async (root, args, context, info) => {
        const { account, password } = args;

        const result = await context.authenticate('graphql-local', {
          account,
          password,
        });
        console.log(result);
        console.log(account, password);
        return '32r892h3jr9qjwr9d';
      },
    },
  },
});
export default MutationType;

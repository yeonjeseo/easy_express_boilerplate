import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signupUser: {
      name: 'Signup',
      description: 'mutation for signup',
      type: GraphQLString,
      args: {
        account: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (root, args, context, info) => {
        const { account, name, password } = args;
        console.log(account, name, password);
        return 'asdasd';
      },
    },
  },
});

export default MutationType;

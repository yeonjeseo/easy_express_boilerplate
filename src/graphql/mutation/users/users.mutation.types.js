import { GraphQLObjectType, GraphQLString } from 'graphql';

export const SignupUserType = new GraphQLObjectType({
  account: { type: GraphQLString },
  name: { type: GraphQLString },
  password: { type: GraphQLString },
});

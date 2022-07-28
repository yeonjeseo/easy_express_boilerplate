import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { SignupUserTypeConfig } from './users/users.mutation.types.js';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signupUser: SignupUserTypeConfig,
  },
});

export default MutationType;

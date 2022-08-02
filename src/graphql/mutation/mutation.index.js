import { GraphQLObjectType } from 'graphql';
import { SignupUserTypeConfig } from './users/users.mutation.typeConfig.js';
import { loginTypeConfig } from './authentications/authentications.mutations.typeConfig.js';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signupUser: SignupUserTypeConfig,
    login: loginTypeConfig,
  },
});
export default MutationType;

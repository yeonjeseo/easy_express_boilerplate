import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';
import { publishToken } from '../../services/authenticate.service.js';
import { SignupUserTypeConfig } from './users/users.mutation.types.js';
import { loginTypeConfig } from './authentications/authentications.mutations.type.js';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signupUser: SignupUserTypeConfig,
    login: loginTypeConfig,
  },
});
export default MutationType;

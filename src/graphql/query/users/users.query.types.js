import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    account: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
});

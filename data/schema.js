import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

var links = [
  {id: 1, title: "Google", url: "google.com"},
  {id: 2, title: "Google1", url: "google1.com"},
  {id: 3, title: "Google2", url: "google2.com"}
];

let linkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

let schema = new GraphQLSchema({
  // top level fields
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      allLinks: {
        type: new GraphQLList(linkType),
        resolve: () => links
      },
    })
  })
});

export default schema;

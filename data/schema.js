import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

var links = [
  {id: 1, title: "Google", url: "https://google.com"},
  {id: 2, title: "Google1", url: "google1.com"},
  {id: 3, title: "Google2", url: "google2.com"}
];

let linkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {
      type: GraphQLString,
      resolve: (obj) => obj.title
     },
    url: {
      type: GraphQLString,
      resolve: (obj) => {
        return obj.url.startsWith("http") ? obj.url : `http://${obj.url}`
      }
    },
    safe: {
      type: GraphQLBoolean,
      resolve: obj => obj.url.startsWith("https")
    }
  })
});

let schema = new GraphQLSchema({
  // top level fields
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({

      square: {
        type: GraphQLInt,
        args: {
          num: { type: GraphQLInt }
        },
        resolve: (_, {num}) => num * num
      },


      allLinks: {
        type: new GraphQLList(linkType),
        resolve: () => links
      },
    })
  })
});

export default schema;

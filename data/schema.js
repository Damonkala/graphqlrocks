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
  {id: 2, title: "Yahoo", url: "yahoo.com"},
  {id: 3, title: "HP", url: "https://hp.com"},
  {id: 4, title: "Dell", url: "https://dell.com"},
  {id: 5, title: "GraphQL", url: "http://graphql.org"},
  {id: 6, title: "React", url: "http://facebook.github.io/react"},
  {id: 7, title: "Relay", url: "http://facebook.github.io/relay"}
];

let linkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {
      type: GraphQLString,
      args: {
        upcase: { type: GraphQLBoolean }
      },
      resolve: (obj, {upcase}) => upcase ? obj.title.toUpperCase() : obj.title
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


let counter = 0;

let schema = new GraphQLSchema({
  // top level fields
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      counter: {
        type: GraphQLInt,
        resolve: () => counter
      },

      square: {
        type: GraphQLInt,
        args: {
          num: { type: GraphQLInt }
        },
        resolve: (_, {num}) => num * num
      },

      links: {
        type: new GraphQLList(linkType),
        args: {
          first: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: (_, {first}) => links.slice(0, first)
      },

      allLinks: {
        type: new GraphQLList(linkType),
        resolve: () => links
      },
    })
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        args: {
          delta: {type: GraphQLInt}
        },
        resolve: (_, {delta}) => {
          counter = counter + delta;
          return counter;
        }
      },
    })
  })

});

export default schema;

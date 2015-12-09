"use strict";
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLID
} from 'graphql';

// var links = [
// {id: 1, title: "Google", url: "https://google.com"},
// {id: 2, title: "Yahoo", url: "yahoo.com"},
// {id: 3, title: "HP", url: "https://hp.com"},
// {id: 4, title: "Dell", url: "https://dell.com"},
// {id: 5, title: "GraphQL", url: "http://graphql.org"},
// {id: 6, title: "React", url: "http://facebook.github.io/react"},
// {id: 7, title: "Relay", url: "http://facebook.github.io/relay"}
// ];
var instructors = [
  {firstName: "George", lastName: "Someone", age: 45, gender: "male"}
]
var students = [
  {fullName: "John Egbert", firstName: "John", lastName: "Egbert", age: 14, gender: "male", level:"freshman", GPA: 3.00, courses: 0},
  {fullName: "Dave Strider", firstName: "Dave", lastName: "Strider", age: 15, gender: "male", level:"junior", GPA: 2.78, courses: 0}
]
var courses = [
  {name: "math", instructor: 0}
]
// var grades = [
//   {student: {fullName: "John Egbert", firstName: "John", lastName: "Egbert", age: 14, gender: "male", level:"freshman", GPA: 3.00},
//    course: {name: "math", instructor: {firstName: "George", lastName: "Someone", age: 45, gender: "male"}},
//     grade: "B", courses: [{name: "math", instructor: {firstName: "George", lastName: "Someone", age: 45, gender: "male"}}]},
//
//   {student: {fullName: "Dave Strider", firstName: "Dave", lastName: "Strider", age: 16, gender: "male", level:"freshman", GPA: 2.78},
//    course: {name: "math", instructor: {firstName: "George", lastName: "Someone", age: 45, gender: "male"}},
//     grade: "B", courses:[{name: "math", instructor: {firstName: "George", lastName: "Someone", age: 45, gender: "male"}}]}
// ]

 let linkType = new GraphQLObjectType({
	 name: 'Link',
	 fields: () => ({
			 id: {type: new GraphQLNonNull(GraphQLID) },
			 title: {
			 type: GraphQLString,
			 args: {
					upcase: {type: GraphQLBoolean},
			 },
			 resolve:
			 (obj, {upcase}) => upcase ? obj.title.toUpperCase()  : obj.title
		 		},
			 url: {
				 		 type: GraphQLString,
			  		 resolve: (obj) => {
							 return obj.url.startsWith("http") ? obj.url : 'http://' + obj.url
						 }},
				safe: {
							type: GraphQLBoolean,
							resolve: (obj) => {
								return obj.url.startsWith("https")
							}
				}
		 })

	 })
 let instructorType = new GraphQLObjectType({
	 name: 'Instructor',
	 fields: () => ({
			//  id: {type: new GraphQLNonNull(GraphQLID) },
			 firstName: { type: GraphQLString },
       lastName: { type: GraphQLString},
       age: { type: GraphQLInt},
       gender: { type: GraphQLString}
			//  resolve: () => Instructor
		 })

	 })
 let studentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
       fullName: { type: GraphQLString },
 		   firstName: { type: GraphQLString },
       lastName: { type: GraphQLString},
       age: { type: GraphQLInt},
       gender: { type: GraphQLString},
       level: { type: GraphQLString},
       GPA: { type: GraphQLInt},
       courses: { type: courseType,
        resolve: (obj)=>{
          // console.log(obj.courses)
          return courses[obj.courses]
        }},
 	 })
 })
// })
let courseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
      name: { type: GraphQLString },
      instructor: { type: instructorType,
      resolve: (obj) => {
        return instructors[obj.instructor]
      }},
    })

  })

 // let gradeType = new GraphQLObjectType({
 //  name: 'Grade',
 //  fields: () => ({
 // 		//  id: {type: new GraphQLNonNull(GraphQLID) },
 // 		 student: { type: studentType },
 //       course: { type: courseType},
 //       grade: {type: GraphQLString}
 // 		//  resolve: () => Instructor
 // 	 })
 //
 //  })
let counter = 0;

let schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			counter: {
				type: GraphQLInt,
				resolve: () => counter
			},
			test: {
				type: GraphQLInt,
				args: {
					num: { type: GraphQLInt }
				},
				resolve: (_, {num}) => num * num
			},
			instructors: {
				type: new GraphQLList(instructorType),
				args: {
					first: { type: GraphQLInt },
				},
				resolve: (_, {first}) => instructors.slice(0, first)
			},
			students: {
				type: new GraphQLList(studentType),
				args: {
					filter: { type: GraphQLString },
				},
				resolve: (_, {first}) => students.slice(0, first)
			},
			courses: {
				type: new GraphQLList(courseType),
				args: {
					first: { type: GraphQLInt },
				},
				resolve: (_, {first}) => courses.slice(0, first)
			},
			// grades: {
			// 	type: new GraphQLList(gradeType),
			// 	args: {
			// 		first: { type: GraphQLInt },
			// 	},
			// 	resolve: (_, {first}) => grades.slice(0, first)
			// },
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
					resolve: (_,{delta}) => {
						counter = counter + delta
						return counter;
					}
				},
				createLink: {
					type: linkType,
					args: {
						title: {type: GraphQLString},
						url: {type: GraphQLString}
					},
					resolve:(_,{title, url}) => {
						let newLink = {title, url, id: Date.now()};
						links.push(newLink);
						return newLink
					}
				}
			})
		})


	});

export default schema;

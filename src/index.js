import { GraphQLServer } from 'graphql-yoga'


const users = [
	{
		id: '1', 
		name: 'Carlos', 
		email: 'carlosdompad@gmail.com',
		age: 41
	},
	{
		id: '2', 
		name: 'Sarah', 
		email: 'sarah@demo.com'
	},
	{
		id: '3', 
		name: 'Juan', 
		email: 'juan@gmail.com'
	}
]

const posts = [
	{
		id: '1', 
		title: 'My first post', 
		body: 'Sample of first post',
		published: true, 
	 	author: '2'	
	},
	{
		id: '2', 
		title: 'My second post', 
		body: 'Im talking about tech',
		published: true, 
		author: '1'
	}
	
]

// Type definitions (schema) 
const typeDefs = `
	type Query {
		posts(query: String): [Post!]!
		users: [User!]!
		me: User!
		post: Post!
	}
	
	type User {
		id: ID! 
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
	}
	
	type Post {
		id: ID! 
		title: String!
		body: String!
		published: Boolean!
		author: User!
	}
`

// Resolvers 
const resolvers = {
	Query: {
		users(parent, args, context, info) {
			return users		
		},
		posts(parent, args, context, info) {
			if (!args.query) {
				return posts
			}
			return posts.filter((post) => post.title.toLowerCase().includes(args.query.toLowerCase()))
		},
		me() {
			return {
				id: "1", 
				name: "Carlos", 
				email: "carlosdompad@gmail.com"
			}
		},
		post() {
			return {
				id: "1", 
				title: "My first post", 
				body: "Demo", 
				published: true
			}
			
		}
	}, 
	Post: {
		author(parent, args, context, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		}
	}
}

// Init our server

const server = new GraphQLServer({ 
	typeDefs, resolvers 
})

server.start(() => {
	console.log("Graph QL Server Started")	
})
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

const comments = [
	{
		id: '1',
		text: 'Comment 1',
		author: '3', 
		post: '2'
	},
	{
		id: '2',
		text: 'Comment 2',
		author: '3',
		post: '1'
	},
	{
		id: '3',
		text: 'Comment 3',
		author: '2',
		post: '1'
	},
	{
		id: '4',
		text: 'Comment 4', 
		author: '1',
		post: '1'
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
		comments: [Comment!]!
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
		comments: [Comment!]!
	}
	
	type Post {
		id: ID! 
		title: String!
		body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}
	
	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
	}
`

// Resolvers 
const resolvers = {
	Query: {
		comments() {
			return comments
		},
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
		}, 
		comments(parent, args, context, info) {
			return comments.filter((comment) => {
				return comment.post == parent.id
			})
		}
	}, 
	User: {
		posts(parent, args, context, info) {
			return posts.filter((post) => {
				return post.author === parent.id	
			})
		},
		comments(parent, args, context, info) {
			return comments.filter((comment) => {
				return comment.author === parent.id	
			})	
		},
	},
	Comment: {
		author(parent, args, context, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		},
		post(parent, args, context, info) {
			return posts.filter((post) => {
				return post.id === parent.post
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
import uuidv4 from 'uuid/v4'

const Mutation = {
	createUser(parent, args, { db }, info) {
		const emailTaken = db.users.some((user) => user.email === args.data.email)

		if (emailTaken) {
			throw Error(`Email ${args.data.email} was taken`)
		}

		const user = {
			id: uuidv4(), 
			...args.data
		}

		db.users.push(user)

		return user
	},
	deleteUser(parent, args, { db }, info) {
		const userIndex = db.users.findIndex((user) => user.id === args.id)

		if (userIndex === -1) {
			throw Error(`User ${args.id} not exists`)
		}

		// We are re-asigning the post array to get only the ones
		// that not belongs to the deleted user
		db.posts = db.posts.filter((post) => {
			const matched = post.author === args.id

			if (matched) {
				db.comments = db.comments.filter((comment) => comment.post !== post.id)
			}

			return !matched
		})

		const deletedUsers = db.users.splice(userIndex, 1)

		return deletedUsers[0]
	},
	createPost(parent, args, { db }, info) {
		const userExists = db.users.some((user) => user.id === args.data.author)

		if (!userExists) {
			throw new Error(`User with id ${args.data.author} not exists`)	
		}

		const post = {
			id: uuidv4(), 
			...args.data
		}

		db.posts.push(post)

		return post
	}, 
	deletePost(parent, args, { db }, info) {
		const postIndex = db.posts.findIndex((post) => post.id === args.id)

		if (postIndex === -1) {
			throw new Error(`Post with id ${args.id} not exists`)
		}

		db.comments = db.comments.filter((comment) => comment.post !== args.id)

		const deletedPosts = db.posts.splice(postIndex, 1)

		return deletedPosts[0] 
	},
	createComment(parent, args, { db }, info) {
		const userExists = db.users.some((user) => user.id === args.data.author)
		const postExists = db.posts.some((post) => post.id === args.data.post && post.published)

		if (!userExists) {
			throw new Error(`User with id ${args.data.author} not exists`)	
		}

		if (!postExists) {
			throw new Error(`Post with id ${args.data.post} not exists`)	
		}

		const comment = {
			id: uuidv4(), 
			...args.data
		}

		return comment
	}, 
	deleteComment(parent, args, { db }, info) {
		const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

		if (commentIndex === -1) {
			throw new Error(`Comment with id ${args.id} not exists`)
		}

		const deletedComments = db.comments.splice(commentIndex, 1)

		return deletedComments[0]
	}
}

export {  Mutation as default }

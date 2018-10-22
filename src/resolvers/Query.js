const Query = {
	comments(parent, args, { db }, info) {
		return db.comments
	},
	users(parent, args, { db }, info) {
		return db.users
	},
	posts(parent, args, { db }, info) {
		if (!args.query) {
			return db.posts
		}
		return db.posts.filter((post) => post.title.toLowerCase().includes(args.query.toLowerCase()))
	}
}

export { Query as default }
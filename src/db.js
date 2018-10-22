
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

const db = {
	users, 
	posts, 
	comments
}

export {
	db as default
}
const { ObjectId } = require('mongoose').Types 
// Is this required? Yes, it creates the connection between the controllers and routes

const { User, Thought } = require('../models')

module.exports = {
		// Route - /api/users
		// TODO: Post a new user
		createUser(req, res){
			User.create(req.body)
				.then((user) => res.json(user))
				.catch((err) => res.status(500).json(err))
		},

		// TODO: Get all users
		getUsers(req, res){
			User.find()
				.then((users) => res.json(users))
				.catch((err) => res.status(500).json(err))
		},

		// Route - /api/users/:userId
		// TODO: Get a single user by its _id and populated thought and friend data
		// Thought and friend data is populated from the model
		getSingleUser(req, res){
			User.findOne({ _id: req.params.userId })
				.select('-__v')
				.then((user) => 
					!user 
						? res.status(404).json({ message: 'No user with that ID' }) 
						: res.json(user)
				)
				.catch((err) => res.status(500).json(err))
		},

		// TODO: Put to update a user by its _id
		updateUser(req, res){
			User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true}
			)
				.then((user) => 
					!user
						? res.status(404).json({ message: 'No user with this id' })
						: res.json(user)
				)
				.catch((err) => {
					console.log(err)
					res.status(500).json(err)
				}) 
		},

		// Action
		// TODO: Delete to remove user by its _id
		deleteUser(req, res){
			User.findOneAndRemove(
				{ _id: req.params.userId })
				.then((user) => {
					if (!user) {
						return res.status(404).json({ message: 'No user with this id' })
					}
					Thought.deleteMany({ _id: { $in: user.thoughts }})
				})
				.then(() => res.json({ message: 'User and associated apps deleted!' }))
				.catch((err) => res.status(500).json(err))
		},


		//  3:20:00
		// Route - /api/users/:userId/friends/:friendId
		// TODO: Post to add a new friend to a user's friend list
		addFriend(req, res){
			User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId }},
				{ new: true }
			)
			.then((user) => 
				!user
					? res.status(404).json({ message: 'No user with this id' })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err)
				res.status(500).json(err)
			})
		},

		// TODO: Delete to remove a friend from a user's friend list
		removeFriend(req, res){
			User.findOneAndRemove(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId }},
				{ new: true }
			)
			.then((user) => 
				!user
					? res.status(404).json({ message: "No user of friend with this id" })
					: res.json(user)
			)
			.catch((err) => {
				console.log(err)
				res.status(500).json(err)
			})
		},
	}

// Reference: 26-Stu_CRUD-Subdoc
// Reference: 28-Stu_Mini-Project > contollers > studentController.js
// Step 1: Build references & connections
// Step 2: Build functions/methods routes to ensure the connections exist
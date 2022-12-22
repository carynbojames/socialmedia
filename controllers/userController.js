const { ObjectId } = require('mongoose').Types // Is this required? 
const { User, Thought } = require('../models')

module.exports = {
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
		updateuser(req, res){
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

		// TODO: Delete to remove user by its _id
		deleteUser(req, res){
			User.findOneAndDelete({ _id: req.params.userId })
				.then((user) => 
					!user
						? res.status(404).json({ message: 'No user with that ID' })
						: User.deleteMany({ _id: { $in: user.applications }}) // ?
				)
				.then(() => res.json({ message: 'User and associated apps deleted!' }))
				.catch((err) => res.status(500).json(err))
		}

	}

// Reference: 26-Stu_CRUD-Subdoc
// Reference: 28-Stu_Mini-Project > contollers > studentController.js
// Step 1: Build references & connections
// Step 2: Build functions/methods routes to ensure the connections exist
const { ObjectId } = require('mongoose').Types
const { Thought } = require('../models')

module.exports = {
	// Route - /api/thoughts

	// Get to get all thoughts
	getThought(req, res){
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err))
	},

	// ?? 
	// Post to create a new thought 
	// (don't forget to push the created thought's _id to the associated user's thoughts array field)
	createThought(req, res){
		Thought.create(req.body)
			.then((thought) => res.json(thought))
			.catch((err) => res.status(500).json(err))
	},

	// Route - /api/thoughts/:thoughtId
	// Get to get a single thought by its _id
	getSingleThought(req, res){
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) => 
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.json(thought)
			)
		.catch((err) => res.status(500).json(err))
	},

	// Put to update a thought by its _id
	updateThought(req, res){
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body }, 
			{ runValidators: true, new: true}
		)
			.then((thought) => 
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.json(thought)
			)
			.catch((err) => {
				console.log(err)
				res.status(500).json(err)
			})
	}

	// Delete to remove a thought by its _id

	// Route - /api/thoughts/:thoughtId/reactions

	// Post to create a reaction stored in a single thought's reactions array field

	// Delete to pull and remove a reaction by the reaction's reactionId value
}
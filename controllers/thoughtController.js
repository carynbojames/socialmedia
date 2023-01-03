const { ObjectId } = require('mongoose').Types
const { Thought, User, ReactionSchema } = require('../models')

module.exports = {
	// Route - /api/thoughts

	// Get to get all thoughts
	getThought(req, res){
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err))
	},

	// Post to create a new thought 
	// (don't forget to push the created thought's _id to the associated user's thoughts array field) 
	async createThought(req, res){
		try {
			const newThought = await Thought.create(req.body)
				// userId is added to be used for the updatedUser. It's not a part of the Thought schema
			console.log(newThought)
			const updatedUser = await User.
				findOneAndUpdate(
					{ _id: req.body.userId},
					{ $push: {thoughts: newThought}}, // newThought._id have the same result
					{ new: true })
				if(!updatedUser) {
					return res.status(404).json({ message: 'No user with this id' })
				}
			res.json(updatedUser)
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	}, 

	// Route - /api/thoughts/:thoughtId
	// Get to get a single thought by its _id

	async getSingleThought(req, res){
		try {
			const singleThought = await Thought
				.findOne({ _id: req.params.thoughtId })
				.select('-__v')
				if(!singleThought) {
					return res.status(404).json({ message: "NO thought with that id"})
				} 
				res.json(singleThought)
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
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
	},

	// Delete to remove a thought by its _id
	deleteThought(req, res){
		Thought.findOneAndRemove(
			{ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({ message: 'No thought with this id'})
				}
				Thought.deleteMany({ _id: { $in: thought.reaction }})
			})
			.then(() => res.json({ message: 'Thought and associated apps deleted'}))
			.catch((err) => res.status(500).json(err))
	},

	// Route - /api/thoughts/:thoughtId/reactions

	// Post to create a reaction stored in a single thought's reactions array field
	async createReaction(req, res){
		try {
			// const newReaction = await ReactionSchema.create(req.body)
			const updatedThought = await Thought.
				findOneAndUpdate(
					{ _id: req.params.thoughtId },
					{ $push: {reactions: req.body }},
					{ new: true })
				if(!updatedThought) {
					return res.status(404).json({ message: 'No thought with this id' })
				}
				console.log(updatedThought)
				res.json(updatedThought)
		} catch (err) {
			console.log(err)
			res.status(500).json(err)
		}
	}, 

	// async getReaction(req, res){
	// 	try {
	// 		const reaction = await Reaction.
	// 	}
	// }

	// Delete to pull and remove a reaction by the reaction's reactionId value
}
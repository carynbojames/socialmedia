const { Schema, model, Types } = require('mongoose')
// Schema: when building a schema?
// model: when building a model?
// Types

const reactionSchema = require('./Reaction') // must be called to be referenced below

const thoughtSchema = new Schema(
	 {
		  thoughtText: {
				type: String,
				required: true,
				min_length: 1,
				max_length: 280,
		  },
		  createdAt: {
				type: Date,
				// Reference: 28-Stu_Mini-Project > models > Course.js
				default: Date.now, // ACTION: research
				// TODO: Use a getter method to format the timestamp on query
		  },
		  // TODO: String, Required (The user that created this thought)
		  // STATUS: research
		  username: [], 
		  // TODO: Array of nested documents created with the reactionSchema
		  // STATUS: test
		  // Reference: 18-Stu_Subdocuments, 23-Ins_Subdoc-Population
		  reactions: [reactionSchema]
	 },
	 {
		  toJSON: {
				getters: true,
				virtuals: true, // Is this required for virtuals? Is this the right syntax? 
		  }
	 }
)

// TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const Thought = model('thought', thoughtSchema)

module.exports = Thought
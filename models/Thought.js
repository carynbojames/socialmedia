const { Schema, model, Types } = require('mongoose')
// Schema: when building a schema?
// model: when building a model?
// Types: not required in this example; what does it do?

const formatDate = require('../utils/formatDate')

const reactionSchema = require('./Reaction') // must be called to be referenced below

const thoughtSchema = new Schema(
	 {
		  thoughtText: {
				type: String,
				required: true,
				min_length: 1, // min? 
				max_length: 280, // max?
		  },
		  createdAt: {
				type: Date,
				// Reference: 28-Stu_Mini-Project > models > Course.js
				default: Date.now, // ACTION: research
				// TODO: Use a getter method to format the timestamp on query
				// STATUS: test
				// Reference: https://mongoosejs.com/docs/schematypes.html#getters
				// Reference: 26-Stu_CRUD-Subdoc > models > User.js > .get and .set
				// get: function(v) {
				// 	return v.toLocaleString()
				// }
				get: timestamp => formatDate(timestamp)
		  },
		  // TODO: String, Required (The user that created this thought)
		  // STATUS: research
		  // Per the instruction this is all that is required. 
		  username: {
				type: String,
				required: true, 
				
		  },
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
userSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought
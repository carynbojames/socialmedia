// Not a model, but a subdocument schema in the Thought model. It will be the reaction field. 
// Reference: 28-Stu_Mini-Project > models > Assignment.js

const { Schema, Types } = require('mongoose')

const formatDate = require('../utils/formatDate')

const reactionSchema = new Schema(
	{
		// TODO: (1) Use Mongoose's ObjectId data type, (2) Default value is set to a new ObjectId
		// STATUS: test, learn
		// Reference: 28-Stu_Mini-Project > models > Assignment.js 
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			max_length: 280
		},
		username: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// TODO: Use a getter method to format the timestamp on query
			// STATUS: test
			get: timestamp => formatDate(timestamp)
			// get: function(v) {
			// 	return v.toLocaleString()
			// }
		}
	},
	{
		toJSON: {
			getters: true
		},
		id: false
	}
)

// const Reaction = model('reaction', reactionSchema)

module.exports = reactionSchema
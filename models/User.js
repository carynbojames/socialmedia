const { Schema, model } = require('mongoose') 
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
	 {
		  username: {
				type: String,
				required: true,
				unique: true, 
				trim: true

		  },
		  email: {
				type: String,
				required: true,
				unique: true,
				// TODO match: //RegExp, creates a validator that checks if the value matches the given regular expression
				// STATUS: research
				match: [/.+@.+\..+/]
		  },
		  // TODO: Array of _id values referencing the Thought model
		  // STATUS: test
		  // Reference: 23-Ins_Subdoc_Population > models > User.js
		  thoughts: [
				{
					 type: Schema.Types.ObjectId,
					 ref: 'thought' 
				}
		  ],
		  // STATUS: Not required. Test. 
		  // NOTES: Maybe this will be used for the Reaction Schema
		  thoughtsSchema: [thoughtSchema], // why does this get pulled in as an array?
		  // TODO: Array of _id values referencing the User model (self-reference)
		  // STATUS: test
		  friends: [{ type: Schema.Types.ObjectId, ref: 'user'}]
	 },
	 // This section is not required. Reference: 11-Ins_Models-Schema
	 {
		  toJSON: {
				getters: true, // not needed
				virtuals: true, // Is this required for virtuals? Is this the right syntax? 
		  },
		  id: false // prevents the redundant id that so that there isn't both _id and id
	 }
)

// TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// STATUS: test
// Reference: 21-Ins_Virtuals > models > Post.js
userSchema.virtual('friendCount').get(function () {
	 return this.friends.length;
})

const User = model('user', userSchema)

module.exports = User;

// QUESTION: model vs types
/// model: 18 > 28-Stu_Mini-Project > model > Student.js
/// Types: 18 > 28-Stu_Mini-Project > model > Assignment.js
const { Schema, Types } = require('mongoose')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // length
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method
        },
        username: [userSchema], // Can you cross reference?
        reactions: {
            // reactionSchema
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

module.exports = thoughtSchema
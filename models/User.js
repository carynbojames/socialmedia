const { Schema, model } = require('mongoose') 
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true // validate
            // trimmed
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match
        },
        thoughts: [thoughtSchema], // why does this get pulled in as an array?
        friends: {
            // 
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const User = model('user', userSchema)

module.exports = User;

// QUESTION: model vs types
/// model: 18 > 28-Stu_Mini-Project > model > Student.js
/// Types: 18 > 28-Stu_Mini-Project > model > Assignment.js
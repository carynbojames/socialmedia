const {connect, connection} = require('mongoose')

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = connection; 

// Reference: 18 > 28-Stu_Mini-Project
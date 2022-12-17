const express = require('express')
const db = require('./config/connection')
// const routes = require()

const PORT = process.env.port || 3003;
const app = express();

app.use(express.urlencoded( { extended: true }))
app.use(express.json())
// app.use(routes)

db.once('open', () => {
    app.listen(PORT, () => {
        console.log('API server running')
    })
})

// Reference: 18 > 28-Stu_Mini-Project
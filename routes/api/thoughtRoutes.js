const router = require('express').Router();

const {
    getThought,
    createThought,
    getSingleThought
} = require('../../controllers/thoughtController')

module.exports = router
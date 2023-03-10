const router = require('express').Router();

const {
    getThought,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought, 
    createReaction, 
    removeReaction
} = require('../../controllers/thoughtController')

router.route('/').get(getThought).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router
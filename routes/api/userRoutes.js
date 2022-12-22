const router = require('express').Router()

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

module.exports = router; 
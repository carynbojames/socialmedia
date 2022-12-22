const router = require('express').Router()

const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend, 
    removeFriend
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route(':userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router; 
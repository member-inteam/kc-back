const express = require('express')
const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    getUser,
    updateUser,
} = require('../controllers/authController')


const router = express.Router()
router.post('/signup', signup)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

// router
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser)

router
    .route('/:id')
    .patch(updateUser)

module.exports = router
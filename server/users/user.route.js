const express = require('express')

const userController= require('./user.controller')
const auth = require('./middleware/auth')
const router = express.Router()
router.post('/users', userController.userPost)
router.post('/users/login', userController.userLogin)
router.get('/users/me', auth, userController.getUser)
router.post('/users/me/logout', auth, userController.userLogout)
module.exports = router
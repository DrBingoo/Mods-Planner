const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

router.get('/register', userController.displayRegister)

router.get('/login', (req, res) => {
    res.render('auth/login', {errormsg: undefined})
})

router.get('/profile', (req, res) => res.render('auth/profile'))

router.post('/login', userController.loginUser)

router.post('/register', userController.registerUser)

router.get('/logout', userController.logoutUser)

module.exports = router
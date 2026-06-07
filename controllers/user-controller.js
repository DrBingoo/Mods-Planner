const userModel = require('../models/user-model')
const majorModel = require('../models/major-model')
const bcrypt = require('bcrypt')

async function displayRegister(req, res){
    let allMajorTitles = await majorModel.getAllMajorTitles()
    res.render('auth/register', {errors: undefined, allMajorTitles})
}

async function registerUser(req, res) {
    const errors = validateInput(req.body)
    if(Object.keys(errors).length > 0){
        let allMajorTitles = await majorModel.getAllMajorTitles()
        res.render('auth/register', {errors, allMajorTitles})
    }else{
        try{
            let passwordHash = await bcrypt.hash(req.body.password.trim(), 10)
            await userModel.createUser({
                userId: req.body.userId,
                username: req.body.username,
                major: req.body.major,
                password: passwordHash
            })
            res.redirect('/login')
        }catch(error){
            console.log(error.message)
            res.render('error', {message: 'Failed to register user'})
        }
    }
}

async function loginUser(req, res){
    const {userId, password} = req.body
    if(userId?.trim()){
        let user = await userModel.getUserById(userId.trim())
        if(!user) return res.render('auth/login', {errormsg: 'User not found'})

        if(await bcrypt.compare(password, user.password)){
            req.session.user = { 
                userId: user.userId, 
                username: user.username, 
                major: user.major,
                role: user.role 
            }
            res.redirect('/')
        }else{
            res.render('auth/login', {errormsg: 'Wrong Password'})
        }
    }else{
        res.render('auth/login', {errormsg: 'Missing fields'})
    }
}

function logoutUser(req, res){
    req.session.destroy((err) => {
        if(err) return res.render('error', {message: 'Logout failed. Try again'})
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
}

function validateInput(user){
    let errors = {}
    const { userId, username, major, password, confirmPassword } = user
    if(!userId?.trim()){
        errors.userId = 'ID required'
    }
    if(!username?.trim()){
        errors.username = 'Username requied'
    }
    if(!major?.trim()){
        errors.major = 'Major required'
    }
    if(!password?.trim()){
        errors.password = 'Password required'
    }
    if(password?.trim() !== confirmPassword?.trim()){
        errors.confirmPassword = 'Password and Confirm Password do not match'
    }
    return errors
}

module.exports = { displayRegister, registerUser, loginUser, logoutUser }
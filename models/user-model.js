const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        alias: 'userId'
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Major'
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: 'String',
        required: true,
        trim: true,
        enum: ['STUDENT', 'ADMIN'],
        default: 'STUDENT'
    }
})

const User = mongoose.model('user', userSchema)

function createUser(user){
    return User.create(user)
}

function getUserById(userId){
    return User.findById(userId)
}

module.exports = { createUser, getUserById }
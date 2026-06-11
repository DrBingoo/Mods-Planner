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
    majorId: {
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
    },
    modulePlan: {
        Y1S1: [{type: String, ref: 'Module'}],
        Y1S2: [{type: String, ref: 'Module'}],
        Y2S1: [{type: String, ref: 'Module'}],
        Y2S2: [{type: String, ref: 'Module'}],
        Y3S1: [{type: String, ref: 'Module'}],
        Y3S2: [{type: String, ref: 'Module'}],
        Y4S1: [{type: String, ref: 'Module'}],
        Y4S2: [{type: String, ref: 'Module'}],
    }
})

const User = mongoose.model('user', userSchema)

function createUser(user){
    return User.create(user)
}

function getUserById(userId){
    return User.findById(userId).select('-modulePlan')
}

function getUserModulePlan(userId){
    return User.findById(userId).populate({path: 'modulePlan', populate: 'Y1S1 Y1S2 Y2S1 Y2S2 Y3S1 Y3S2 Y4S1 Y4S2'})
}

module.exports = { createUser, getUserById, getUserModulePlan }
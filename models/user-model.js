const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        alias: '_id'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Major'
    },
    role: {
        type: 'String',
        required: true,
        trim: true,
        enum: ['STUDENT', 'ADMIN'],
        default: 'STUDENT'
    }
})
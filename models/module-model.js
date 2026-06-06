const mongoose = require('mongoose')
const moduleSchema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true, 
        trim: true,
        alias: 'code'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
})

const Module = mongoose.model('Module', moduleSchema)

function getModule(code){
    return Module.find({code})
}

function addModule(modules){
    return Module.create(modules)
}

module.exports = {
    addModule, getModule
}
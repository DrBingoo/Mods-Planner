const mongoose = require('mongoose')
const majorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    modulesToClear: [
        {
            type: String,
            required: true,
            ref: 'Module'
        }
    ]
})

const Major = mongoose.model('Major', majorSchema)

function addMajor(major){
    return Major.create(major)
}

function updateMod(){
    return Major.findByIdAndUpdate()
}

module.exports = {
    addMajor, updateMod
}
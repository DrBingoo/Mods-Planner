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

function getAllMajorTitles(){
    return Major.find().select('title')
}

function getMajor(majorId){
    return Major.findById(majorId).populate('modulesToClear')
}

function getModulesToClear(majorId){
    return Major.findById(majorId).select('modulesToClear')
}

function majorExists(majorId){
    return Major.exists({ _id: majorId })
}

module.exports = {
    addMajor, updateMod, getAllMajorTitles, getMajor, getModulesToClear, majorExists
}
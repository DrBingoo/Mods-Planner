const userModel = require('../models/user-model')
const majorModel = require('../models/major-model')
const moduleModel = require('../models/module-model')

const VALID_YEAR_SEM = ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1', 'Y3S2', 'Y4S1', 'Y4S2']

async function displayModulePage(req, res) {
    const userMajor = await majorModel.getMajor(req.session.user.majorId)
    const userModulePlan = await userModel.getUserModulePlan(req.session.user.userId)
    //extract only the Module Id to a Set
    const IdsInModulePlan = new Set(Object.values(userModulePlan.modulePlan).flat().map(module => module._id))
    res.render('index', {userMajor, IdsInModulePlan, modulePlan: userModulePlan.modulePlan})
}

async function updateModulePlan(req, res) {
    try{
        // Check if req.body is an actual object, if not, the code below will run
        if (!req.body || typeof req.body !== 'object' ||
            Array.isArray(req.body) || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Invalid modulePlan format' })
        }
        // Check if the keys are valid, if not, the code below will run
        for (const yearSem of VALID_YEAR_SEM) {
            if (!Object.keys(req.body).includes(yearSem)) {
                return res.status(400).json({ message: 'Invalid or Missing semesters keys' })
            }
        }
        // Check if there is any duplicates
        const newModulePlan = Object.values(req.body).flat()
        const uniqueModulePlan = new Set(newModulePlan)
        if(newModulePlan.length !== uniqueModulePlan.size){
            return res.status(400).json({ message: 'Duplicate modules found' })
        }else{
            // Check if modules submitted are valid modules under user's major
            const userMajor = await majorModel.getModulesToClear(req.session.user.majorId)
            for(const module of newModulePlan){
                if(!userMajor.modulesToClear.includes(module)){
                    return res.status(400).json({ message: 'Invalid Module ID' })
                }
            }
            // If all good, proceed to update
            await userModel.updateUserModulePlan(req.session.user.userId, req.body)
            return res.json({ message: 'Plan updated successfully' })
        }
    }catch(error){
        console.log(`Update Module Plan error: ${error}`)
        res.status(500).json({ message: "Server error. Try again later" })
    }
}

module.exports = { displayModulePage, updateModulePlan }
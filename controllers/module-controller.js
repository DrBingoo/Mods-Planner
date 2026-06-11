const userModel = require('../models/user-model')
const majorModel = require('../models/major-model')
const moduleModel = require('../models/module-model')

async function displayModulePage(req, res) {
    let userMajor = await majorModel.getMajor(req.session.user.majorId)
    let userModulePlan = await userModel.getUserModulePlan(req.session.user.userId)
    const IdsInModulePlan = new Set(Object.values(userModulePlan.modulePlan).flat().map(module => module._id))
    res.render('index', {userMajor, IdsInModulePlan, modulePlan: userModulePlan.modulePlan})
}

module.exports = { displayModulePage }
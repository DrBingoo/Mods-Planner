const express = require('express')
const moduleController = require('../controllers/module-controller')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()

router.get('/', authMiddleware.isLoggedIn, moduleController.displayModulePage)

router.post('/modules-plan', authMiddleware.isLoggedIn, moduleController.updateModulePlan)

router.get('/mod', async(req,res) => {
    
})

module.exports = router
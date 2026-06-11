const express = require('express')
const moduleController = require('../controllers/module-controller')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()

router.get('/', authMiddleware.isLoggedIn, moduleController.displayModulePage)

router.post('/mod', async (req, res) => {
    await majorModel.updateMod()
    res.json({message: 'success'})
})

router.get('/mod', async(req,res) => {
    
})

module.exports = router
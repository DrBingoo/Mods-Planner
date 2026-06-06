const express = require('express')
const moduleModel = require('../models/module-model')
const majorModel = require('../models/major-model')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/mod', async (req, res) => {
    await majorModel.updateMod()
    res.json({message: 'success'})
})

router.get('/mod', async(req,res) => {
    const module = await moduleModel.getModule('SE101')
    console.log(module)
    res.json(module._id)
})

module.exports = router
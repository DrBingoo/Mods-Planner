const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const modsRoutes = require('./routes/mods-routes')
const server = express()

dotenv.config()

server.use(express.static('public'))
server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))


server.use((req, res, next) => {
    res.locals.username = null
    if(req.session.user){
        res.locals.username = req.session.user.username
    }
    next()
})

//routes
server.use(modsRoutes)

//404 fallback
server.use((req, res) => {
    res.status(404).json({message: '404'})
})

async function connectdbStartServer(){
    try{
        await mongoose.connect(process.env.DB)
        console.log('DB connected')
        server.listen(5000, 'localhost', () => {
            console.log('server connected')
        })
    }catch(error){
        console.log(error.message)
    }
}

connectdbStartServer()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config() 
const {expressjwt} = require('express-jwt')




//middleware (for every request)
app.use(express.json())
//morgan 
app.use(morgan('dev'))

//connect mongoose
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL,()=>console.log('connected to mongodb database'))

//routes
app.use('/auth', require('./routes/authRouter.js'))
app.use("/api", expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
// express-jwt is a npm package it is a gate keeper it checks for token
app.use('/api/likes', require('./routes/likesRouter.js'))


//Error handler and to have these 4 params 
app.use((err,req,res,next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


//server listen
app.listen(9000,()=>{
    console.log('The server is running on port 9000')
})
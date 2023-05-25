const express = require('express')
const likesRouter = express.Router()
const Likes = require('../models/likes.js')


//route//

//get all
likesRouter.get( "/",(req,res,next)=>{  
    Likes.find((err,likes)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(likes)
    })
})

//get w/queries filter 

likesRouter.get("/search/genre", (req,res,next)=> {
    Likes.find({living: req.query.genre},(err,likedItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(likedItem)
    })
})

likesRouter.get("/search/type", (req,res,next)=> {
    Likes.find({type: req.query.type},(err,likedItem)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(likedItem)
    })
})


//post w/mongoDB
likesRouter.post("/",(req,res,next)=>{
    const newLike = new Bounty(req.body)
    newLike.save((err,savedLike)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedLike)
    })
})

//delete
likesRouter.delete("/:likeId", (req,res,next)=>{
    Likes.findOneAndDelete({_id: req.params.likeId},(err,deletedLike)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedLike.title}`)
    })
})

//put(edit)
likesRouter.put("/:likeId", (req,res,next)=>{
    Likes.findOneAndUpdate(
        {_id: req.params.likeId},
        req.body,
        {new:true},
        (err,updatedLike)=>{
            if(err){
                res.status(500)
                return nexy(err)
            }
            return res.status(201).send(updatedLike)
        }
    )
})








module.exports = likesRouter
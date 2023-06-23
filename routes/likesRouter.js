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

//get issue by user id
likesRouter.get("/user",(req,res,next) =>{
    Likes.find({user:req.auth._id},(err,likes)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(likes)
    })
})

//get w/queries filter 

// likesRouter.get("/search/genre", (req,res,next)=> {
//     Likes.find({genre: req.query.genre},(err,likedItem)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(likedItem)
//     })
// })

// likesRouter.get("/search/type", (req,res,next)=> {
//     Likes.find({type: req.query.type},(err,likedItem)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(likedItem)
//     })
// })

// //get movies by search term 
// likesRouter.get('/search', (req,res,next)=>{
//     const {title} = req.query//grabbing movie property 
//     const pattern = new RegExp(title)//need to turn movie into a regex to use below  regex is for password and email
//     Likes.find({ title: { $regex: pattern, $options: 'i' } },//this i looking for an movie that matches anything in the provided string.
//     //"i" means case sensitivity doesnt matter
//     (err,movies)=>{
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(movies)
//     }) 
// })


//post w/mongoDB add one 
likesRouter.post("/",(req,res,next)=>{
    req.body.user = req.auth._id
    const newLike = new Likes(req.body)
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
    Likes.findOneAndDelete({_id: req.params.likeId,user:req.auth._id},(err,deletedLike)=>{
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
        {_id: req.params.likeId,user:req.auth._id},// find this one to update user:req.auth._id is to make sure only the user can do updates and deletes with 
        req.body,//update the object with this data
        {new:true},// send back the updated version please
        (err,updatedLike)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedLike)
        }
    )
})

module.exports = likesRouter
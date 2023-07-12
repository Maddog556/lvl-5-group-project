const express = require('express')
const likesRouter = express.Router()
const Likes = require('../models/likes.js')

//route//

//get all
likesRouter.get("/",(req,res,next)=>{  
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
likesRouter.delete("/:likesId", (req,res,next)=>{
    Likes.findByIdAndDelete({_id: req.params.likesId},
        (err,deletedLike)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedLike.title}`)
    })
})

likesRouter.get('/:likesId',(req,res,next)=>{
    Likes.findOne({_id: req.params.likesId},(err,Likes) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(Likes)
    })
})

// //put(edit)
// likesRouter.put("/:likeId", (req,res,next)=>{
//     Likes.findOneAndUpdate(
//         {_id: req.params.likeId,user:req.auth._id},// find this one to update user:req.auth._id is to make sure only the user can do updates and deletes with 
//         req.body,//update the object with this data
//         {new:true},// send back the updated version please
//         (err,updatedLike)=>{
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(201).send(updatedLike)
//         }
//     )
// })

module.exports = likesRouter
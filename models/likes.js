const mongoose = require('mongoose')
const Schema = mongoose.Schema

//likes blueprint 

const likesSchema = new Schema({
    moviePoster:{
        type:String,
        required:true
    },
    
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["movie",'tv-show']
    },
    genre: {
        type: String,
        required: true,
        enum: ['action','horror', 'comedy', 'fantasy']
    },
    // have to give a object id to map thur
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

module.exports = mongoose.model('Likes', likesSchema )
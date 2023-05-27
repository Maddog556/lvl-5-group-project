const mongoose = require('mongoose')
const Schema = mongoose.Schema

//likes blueprint 

const likesSchema = new Schema({
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
    }
})

module.exports = mongoose.model('Likes', likesSchema )
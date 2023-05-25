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
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Likes', likesSchema )
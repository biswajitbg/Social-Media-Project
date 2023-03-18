const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    userId:{
        type:String,
        require:true
        
        
    },
    desc:{
        type:String,
        require:true,
        min:8,
        max:150,
        
    },
    image:{
        type:String,
        
    },
    likes:{
        type:Array,
        default : []
    },

},{timestamps:true})

module.exports = mongoose.model("Post",postSchema )
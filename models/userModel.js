const mongoose = require("mongoose");

const userSchema  =new mongoose.Schema({
    
    username:{
        type:String,
        require:true,
        min:3,
        max:15,
        unique:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:3,
        max:8,
        
    },
    
    profilepicture:{
        type:String,
        default:""
        
    },

    coverpicture:{
        type:String,
        default:"",
        
    },
    followers:{
        type:Array,
        default:[],
    },

    following:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50
    },

    relationship:{
        type:Number,
        enum:[1,2,3]
    },





},{timestamps:true});

module.exports = mongoose.model("User",userSchema)
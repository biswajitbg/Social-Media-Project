const postModel = require("../models/postModel")


const createPost = async(req,res)=>{

const newPost = new postModel(req.body);
try{
  const savePost = await newPost.save();
  res.status(201).send(savePost)

}catch(error){
  res.status(500).send(error)

}

}




module.exports = {createPost};
       

 
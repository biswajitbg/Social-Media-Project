
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const createUser = async(req,res)=>{

    try{
        let data = req.body;

        const {username,email,password} = data;
        if(!(username && email && password)){
            return res.status(400).send("all fiels are mandatory")
        }
        data.password = bcrypt.hashSync(data.password) // for encrypted password

        let existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send("the email already been used")
        }

        const createData = await userModel.create(data);
        return res.status(201).send({status:true,message:"user created successfully",data:createData});

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });

    }

};

/////////////////////////////////////////user Login/////////////////////////////

const userLogin = async(req,res)=>{
     try{

        let data = req.body;

        const {email,password} = data;
        if(!(email && password)){
            res.status(400).send("send all data")
    }
    //find user in db
    
    const user = await userModel.findOne({email});
    
    if(user){
        const validPassword = bcrypt.compareSync(password,user.password)
    
        if (!validPassword) {
            return res.status(401).send({ status: false, message: "Invalid Password Credential" });
        }
    }
    else {
        return res.status(401).send({ status: false, message: "Invalid email Credential" });
    }
    
    /////////// token generation //////////////
    
    
    const token = jwt.sign({
        userId:user._id,
    },"socialMedia");
    
    res.setHeader("Authorization",token);
    res.status(200).send({status:true,message:"you are successfully logged in",data:token})

       }catch(error){

          return res.status(500).send({ status: false, message: error.message });
      }
   


 };
// //////////////////////////////////////get user/////////////////////////////////

 const getUser = async(req,res)=>{
    try{
        const userData = await userModel.findById(req.params.userId);

        const {password,updatedAt,...other} = userData._doc
         return res.status(200).send({status:true,message:"get user details",data:other})

    }catch(error){
        res.status(500).send({ status: false, message: error.message })
    }
 };








/////////////////////////////////////updateUser//////////////////////////////

const updateUser = async(req,res)=>{
    try{
        

        if(req.body.userId===req.params.userId||req.body.isAdmin){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
            const userUpdate = await userModel.findByIdAndUpdate({_id:req.params.userId},{$set:req.body},{new:true});
            return res.status(200).send({status:true,message:"update successfully",data:userUpdate})
        }else{
            return res.status(403).send("you can update only your account")
        }
        
    }catch(error){
        return res.status(500).send({ error: err.message });
    }
};


                       ///////////////////// follow user////////////////////

const followUser = async(req,res)=>{
    try{
        if(req.body.userId!==req.params.userId){

            const user = await userModel.findById(req.params.userId);
            const currentUser = await userModel.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.userId}})
                return res.status(200).send("user has been followed")

            }else{
                return res.status(403).send("you already follow this user")
            }

        }else{
           return res.status(403).send("you can not follow yourself")
        }

    }catch(error){
        console.log(error)
        return res.status(500).send({ error: error.message });

    }
};


/////////  unfollow user//////////////////////////////////////////


const unfollowUser = async(req,res)=>{
    try{
        if(req.body.userId!==req.params.userId){

            const user = await userModel.findById(req.params.userId);
            const currentUser = await userModel.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.userId}})
                return res.status(200).send("user has been unfollowed")

            }else{
                return res.status(403).send("you don't follow this user")
            }

        }else{
           return res.status(403).send("you can not follow yourself")
        }

    }catch(error){
        console.log(error)
        return res.status(500).send({ error: error.message });

    }
};


   





///////////////////////////delete user//////////////////////////////

const deleteUser = async(req,res)=>{
    try{
        

        if(req.body.userId===req.params.userId||req.body.isAdmin){
           
            const userDelete = await userModel.deleteOne({_id:req.params.userId});
            return res.status(200).send({message:"delete successfully",data:userDelete})
        }else{
            return res.status(403).send("you can delete only your account")
        }
        
    }catch(error){
        return res.status(500).send({ error: err.message });
    }
};






module.exports = {createUser,userLogin,updateUser,deleteUser,getUser,followUser,unfollowUser };
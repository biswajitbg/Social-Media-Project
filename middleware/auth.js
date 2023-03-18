const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');


const Authentication = async(req,res,next)=>{
    try{
        let token =req.header("Authorization")
        if(!token){
            return res.status(401).send({status:false,message:"login is required"})
    
        }
        let splitToken = token.split(" ");

        ////////////////////// token verify////////////////////

        jwt.verify(splitToken[1], "socialMedia", (error, decodedtoken) => {
            if (error) {
                const message =
                    error.message === "jwt expired" ? "Token is expired, Please login again" : "Token is invalid, Please recheck your Token"
                return res.status(401).send({ status: false, message });
            }
            req.token = decodedtoken.userId;
            next();
        });

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });
    }
};

let Authorization = async function (req, res, next) {
    try {
        let userId = req.params.userId;

        //validation for given customerId
       

        //----------------------------- Checking if customer exist or not -----------------------------//
        let user = await userModel.findById({ _id: userId });
        if (!user) {
            return res.status(404).send({ status: false, message: "user does not exist with this userId" });
        }

        //----------------------------- Authorisation checking -----------------------------//
        if (req.token != user._id) {
            return res.status(403).send({ status: false, message: "Unauthorised access" });
        }
        next();
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports= {Authentication,Authorization};
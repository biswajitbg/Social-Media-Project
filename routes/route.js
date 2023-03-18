const express = require("express")
const router= express.Router();
const {createUser,userLogin,updateUser,deleteUser,getUser,followUser,unfollowUser} = require("../controller/userController")
const {createPost} = require("../controller/postController")
const {Authentication,Authorization} = require("../middleware/auth")


///////////////////// user Schema///////////////////////////
router.post("/register",createUser);
router.post("/login",userLogin);
router.get("/getuser/:userId",Authentication,Authorization,getUser)
router.put("/updateuser/:userId",Authentication,Authorization,updateUser)
router.delete("/userdelete/:userId",deleteUser)
router.put("/follower/:userId",followUser)
router.put("/unfollow/:userId",unfollowUser)


/////////////////////////post schema/////////////////////////////////

router.post("/createpost",createPost)







module.exports = router;
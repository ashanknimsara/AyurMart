const express = require("express");
const { registerUser, updateUserProfile, authUser, DeleteProfile, ViewUsers} = require("../controllers/userControllers");
const  protect  =require("../middlewares/authMiddleware");
const User = require("../models/user");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
  //.route("/:id")
  
  
router.route("/:id").delete(protect, DeleteProfile);

router.route("/view").get((req,res)=>{
  User.find().then((users)=>{
      res.json(users)
  }).catch((err)=>{
      console.log(err)
  })
})
  


module.exports = router;
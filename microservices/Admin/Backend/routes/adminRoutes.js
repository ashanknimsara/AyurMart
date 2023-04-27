const express = require("express");
const { registerUser, updateUserProfile, authUser, DeleteProfile, ViewUsers} = require("../controllers/userControllers");
const  protect  =require("../middlewares/authMiddleware");
const Admin = require("../models/admin");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
  //.route("/:id")
  
  
router.route("/:id").delete(protect, DeleteProfile);

router.route("/view").get((req,res)=>{
  Admin.find().then((admins)=>{
      res.json(admins)
  }).catch((err)=>{
      console.log(err)
  })
})
  


module.exports = router;
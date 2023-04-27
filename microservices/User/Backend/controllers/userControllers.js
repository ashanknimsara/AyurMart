
//error handling
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken");


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone,pic } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exists ");
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone:user.phone,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
  throw new Error("Error occured ");

  }
});


//@description     Auth the user
//@route           POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const {  email, password } = req.body;
   const user = await User.findOne({ email });

   if (user && (await user.matchPassword(password))) {
     res.json({
       _id: user._id,
       name: user.name,
       email: user.email,
       isAdmin: user.isAdmin,
       phone: user.phone,
       pic: user.pic,
       token: generateToken(user._id),
     });
   } else {
     res.status(401);
     throw new Error("Invalid Email or Password");
   }

  
});




// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  //initially need their id 
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone=req.body.phone ||user.phone;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
//send to the frontend
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: user.phone,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
    //user doesnt exist
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});



const DeleteProfile = asyncHandler(async (req, res) => {
  var id = req.params.id;
  const user= await User.findByIdAndRemove(id).exec().then(()=>{
    res.json({ message: " User Removed" });
  }).catch((err)=>{
    res.status(404);
    throw new Error("User not Found");
  })

  
  
});



module.exports = { registerUser, authUser, updateUserProfile, DeleteProfile };
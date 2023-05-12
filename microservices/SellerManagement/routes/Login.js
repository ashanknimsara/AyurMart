const router = require("express").Router();
const Seller = require("../models/Seller");

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

//token given key
const sec = "kjktjtjtjt";

router.use(cookieparser());

// Signup route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const sellerImp = await Seller.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(sellerImp);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const sellerImp = await Seller.findOne({ username });

  const passwordOk = bcrypt.compareSync(password, sellerImp.password);

  if (passwordOk) {
    // Generate a JWT token and set it as a cookie
    jwt.sign({ username, id: sellerImp._id }, sec, {}, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json("You are successfully logged in");
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

// View profile route
router.get("/profile", async (req, res) => {
  try {
    // Get the user ID from the JWT token
    const decodedToken = jwt.verify(req.cookies.token, sec);
    const sellerImp = await Seller.findById(decodedToken.id);

    // Return the user's profile information
    res.json({
      username: sellerImp.username,
      email: sellerImp.email,
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});

// Update profile route
router.put("/profile", async (req, res) => {
  try {
    // Get the user ID from the JWT token
    const decodedToken = jwt.verify(req.cookies.token, sec);

    // Find the seller by ID and update their profile information
    const sellerImp = await Seller.findByIdAndUpdate(
      decodedToken.id,
      { $set: req.body },
      { new: true }
    );

    // Return the updated seller information
    res.json({
      username: sellerImp.username,
      email: sellerImp.email,
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});

// Delete profile route
router.delete("/profile", async (req, res) => {
  try {
    // Get the user ID from the JWT token
    const decodedToken = jwt.verify(req.cookies.token, sec);

    // Find the seller by ID and delete their profile
    await Seller.findByIdAndDelete(decodedToken.id);

    // Clear the cookie
    res.clearCookie("token").json("Your account has been deleted");
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});
// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token").json("You have been logged out");
});

// Get all sellers route
router.get("/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Delete a specific seller by ID route
router.delete("/sellers/:id", async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
    if (deletedSeller) {
      res.json(`Seller with ID ${req.params.id} has been deleted`);
    } else {
      res.status(404).json(`Seller with ID ${req.params.id} not found`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

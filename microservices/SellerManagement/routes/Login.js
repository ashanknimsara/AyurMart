const router = require("express").Router();
const Seller = require("../models/Seller");

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

//token given key
const sec = "kjktjtjtjt";

router.use(cookieparser());

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

//login

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const sellerImp = await Seller.findOne({ username });

  const passwordOk = bcrypt.compareSync(password, sellerImp.password);

  if (passwordOk) {
    //logged
    jwt.sign({ username, id: sellerImp._id }, sec, {}, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json("You are successfully logged in");
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

//get profile with checked logged
router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, sec, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

router.post("/logout", (req, res) => {
  res.cookie("token", " ").json("ok");
});

// delete seller by id
router.delete('/sellers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeller = await Seller.findByIdAndDelete(id);
    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json({ message: 'Seller deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// update seller by id
router.put('/sellers/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const sellerToUpdate = await Seller.findById(id);
    if (!sellerToUpdate) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    sellerToUpdate.username = username || sellerToUpdate.username;
    sellerToUpdate.email = email || sellerToUpdate.email;
    sellerToUpdate.password = password ? bcrypt.hashSync(password, salt) : sellerToUpdate.password;

    const updatedSeller = await sellerToUpdate.save();
    res.json(updatedSeller);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

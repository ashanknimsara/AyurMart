const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/WishListModel");

//localhost:8070/wishlist/add ---> insert
http: router.post("/add", (req, res) => {
  const { productName, productPrice, productImage, userId, productId } =
    req.body;

  const newWishlist = new Wishlist({
    productName,
    productPrice,
    productImage,
    userId,
    productId,
  });

  newWishlist
    .save()
    .then(() => {
      res.json("Item added to wishlist Successfully...");
    })
    .catch((err) => {
      console.log(err);
    });
});

//localhost:8070/wishlist/ ---> get all items
htttp: router.route("/").get((req, res) => {
  Wishlist.find()
    .then((wishlist) => {
      res.json(wishlist);
    })
    .catch((err) => {
      console.log(err);
    });
});

//localhost:8070/wishlist/delete/id ---> delete
//632d73191a0b955e6bf13d06

http: router.route("/delete/:id").delete(async (req, res) => {
  let ID = req.params.id;

  await Wishlist.findByIdAndDelete(ID)

    .then(() => {
      res.status(200).send({ status: "Successfully removed from wishList" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting item", error: err.message });
    });
});
module.exports = router;

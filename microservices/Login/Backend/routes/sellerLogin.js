const router = require("express").Router();
const Seller = require("../models/sellerModels");

router.route("/view").get((req, res) => {
  Seller.find().then((sellers) => {
      res.json(sellers);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
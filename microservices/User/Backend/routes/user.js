const router = require("express").Router();
let User = require("../models/user");

router.route("/view").get((req, res) => {
  User.find().then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
const router = require("express").Router();
let Admin = require("../models/admin");

router.route("/view").get((req, res) => {
  Admin.find().then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
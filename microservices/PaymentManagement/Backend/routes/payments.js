const express = require("express");
const router = express.Router();

const Payment = require("../models/payment");

router.get("/testpayment", (req, res) => res.send("Payment route testing!"));

router.get("/all", (req, res) => {
    Payment.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noCartfound: "No Payment found" }));
});
router.get("/:id", (req, res) => {
    Payment.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ noCartfound: "No Payment found" }));
});
router.post("/send", (req, res) => {
    Payment.create(req.body)
    .then((item) => res.json({ msg: "add Payment successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add" }));
});
router.put("/:id", (req, res) => {
    Payment.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});
router.delete("/:id", (req, res) => {
    Payment.findByIdAndRemove(req.params.id, req.body)
    .then((item) => res.json({ msg: "Payment entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such Payment" }));
});
module.exports = router;
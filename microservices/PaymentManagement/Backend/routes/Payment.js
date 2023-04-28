const express = require('express')
const router = express.Router()
const PaymentSchema  = require("../models/Payment")
const { Payment } = require('./Payment')

router.get("/get-Payment" , async(req,res)=>{
    let Payment = PaymentSchema.find({} , function(err , result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({result})
        }
    })
})

router.route("/add-Payment").post((req, res) => {
    const cardName = req.body.cardName;
    const cardNumber = req.body.cardNumber;
    const expiry = req.body.expiry;
    const cvv = req.body.cvv;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const amount = req.body.amount;
    const IDOrder = req.body.IDOrder;
    const payID = req.body.payID;
    
   
    

    const newPayment = new PaymentSchema({
        cardName,
        cardNumber,
        expiry,
        cvv,
        street,
        city,
        state,
        zip,
        amount,
        IDOrder,
        payID,
    
        
       
    })

    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err) => {
        console.log(err);
    })
})



router.route("/update-Payment/:id").put(async (req, res) => {
    let Payment_id = req.params.id;
    const {
        cardName,
        cardNumber,
        expiry,
        cvv,
        street,
        city,
        state,
        zip,
        amount,
        IDOrder,
        payID,
       
    } = req.body;

    const updatePayment = {
        cardName,
        cardNumber,
        expiry,
        cvv,
        street,
        city,
        state,
        zip,
        amount,
        IDOrder,
        payID,
    }

    const update = await PaymentSchema.findByIdAndUpdate(Payment_id, updatePayment)
        .then(() => {
            res.status(200).send({ status: "Payment updated..." })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})

router.route("/delete-Payment/:id").delete(async(req, res) => {
        const update = await PaymentSchema.findByIdAndUpdate(Payment_id, updatePayment)
            .then(() => {
                res.status(200).send({ status: "Payment updated..." })
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Error with updating data", error: err.message });
            })
    })
    
//644a51a3313e3591d49a87a6
router.delete("/delete-Payment/:id", async(req, res) => {
    let Payment_id = req.params.id;

    //console.log(driver_id)wwdd

    await PaymentSchema.deleteOne({ _id: Payment_id })
        .then(() => {
            res.status(200).send({
                status: "Payment deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Payment", error: err.message });
        })
})

module.exports = router;
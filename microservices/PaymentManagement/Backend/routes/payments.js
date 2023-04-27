const router = require("express").Router();
let Payment = require('../models/payment');

router.route('/add').post(async(req,res) => {

    const newPayment = new Payment({

        payID: req.body,
        cardName: req.body.cardName,
        cardNumber: req.body.cardNumber,
        expiry: req.body.expiry,
        cvv: req.body.cvv,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        amount: req.body.amount,
        IDOrder: req.body.IDOrder
    })


    const totalNumberOfPayInDb = await Payment.countDocuments()

    let numberToString = totalNumberOfPayInDb.toString()

    
    if(numberToString.length < 5){
        for (let i = numberToString.length; i < 3; i++){
            numberToString = '0' + numberToString
        }
    }
    newPayment.payID = `PMT${numberToString}`

    newPayment.save().then(() => {
        res.json("Payment added")
    }).catch((err) => {
        console.log(err)
    })
})


router.route("/view").get((req,res)=>{

    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/view/:id").get(async(req,res)=>{

    let payId = req.params.id;

    const payment = await Payment.findById(payId).then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get payment", error: err.message});
    })
})

module.exports = router;
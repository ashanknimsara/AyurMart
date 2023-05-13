const express = require('express')
const router = express.Router()
const DeliverySchema  = require("../models/Delivery")
const { Delivery } = require('./Delivery')

router.get("/get-Delivery" , async(req,res)=>{
    let Delivery = DeliverySchema.find({} , function(err , result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({result})
        }
    })
})

router.route("/add-Delivery").post((req, res) => {
    const cusName = req.body.cusName;
    const address = req.body.address;
    const date = req.body.date;
    const nic = req.body.nic;
    const contactNumber = req.body.contactNumber;
    const deliveryStatus = req.body.deliveryStatus;
    

    const newDelivery = new DeliverySchema({
        cusName,
        address,
        date,
        nic,
        contactNumber,
        deliveryStatus,
       
    })

    newDelivery.save().then(()=>{
        res.json("Delivery Added")
    }).catch((err) => {
        console.log(err);
    })
})



router.route("/update-Delivery/:id").put(async (req, res) => {
    let Delivery_id = req.params.id;
    const {
        cusName,
        address,
        date,
        nic,
        contactNumber,
        deliveryStatus,
    } = req.body;

    const updateDelivery = {
        cusName,
        address,
        date,
        nic,
        contactNumber,
        deliveryStatus,
    }

    const update = await DeliverySchema.findByIdAndUpdate(Delivery_id, updateDelivery)
        .then(() => {
            res.status(200).send({ status: "Delivery updated..." })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})

router.route("/delete-Delivery/:id").delete(async(req, res) => {
        const update = await DeliverySchema.findByIdAndUpdate(Delivery_id, updateDelivery)
            .then(() => {
                res.status(200).send({ status: "Driver updated..." })
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Error with updating data", error: err.message });
            })
    })
 
router.delete("/delete-Delivery/:id", async(req, res) => {
    let Delivery_id = req.params.id;

 

    await DeliverySchema.deleteOne({ _id: Delivery_id })
        .then(() => {
            res.status(200).send({
                status: "Delivery deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Delivery", error: err.message });
        })
})



module.exports = router;
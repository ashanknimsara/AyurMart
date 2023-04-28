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
    const driverName = req.body.driverName;
    const vehicleNumber = req.body.vehicleNumber;
    const nic = req.body.nic;
    const contactNumber = req.body.contactNumber;
    const deliveryStatus = req.body.deliveryStatus;
    

    const newDelivery = new DeliverySchema({
        cusName,
        address,
        date,
        driverName,
        vehicleNumber,
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
        driverName,
        vehicleNumber,
        nic,
        contactNumber,
        deliveryStatus,
    } = req.body;

    const updateDelivery = {
        cusName,
        address,
        date,
        driverName,
        vehicleNumber,
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
    /* 
    router.route("/delete-driver/:id").delete(async (req,res)=>{
        let driver_id = req.params.id;

        await DriverSchema.findByIdAndDelete(driver_id)
            .then(() => {
                res.status(200).send({
                    status: "driver deleted"
                });
            }).catch((err) => {
                console.log(err.message);
                res.status(500).send({ status: "Error with delete driver", error: err.message });
            })
    })

    */
//644a51a3313e3591d49a87a6
router.delete("/delete-Delivery/:id", async(req, res) => {
    let Delivery_id = req.params.id;

    //console.log(driver_id)wwdd

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


/*
router.delete("/delete-Delivery/:id", async(req, res) => {
    let Delivery_id = req.params.id;

    //console.log(driver_id)wwdd

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
*/
module.exports = router;
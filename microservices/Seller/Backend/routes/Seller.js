const express = require('express')
const router = express.Router()
const SellerSchema  = require("../models/Seller")
const { Seller } = require('./Seller')

router.get("/get-Seller" , async(req,res)=>{
    let Seller = SellerSchema.find({} , function(err , result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({result})
        }
    })
})

router.route("/add-Seller").post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const Email = req.body.Email;
    const phoneno = req.body.phoneno;
   
    

    const newSeller = new SellerSchema({
        name,
        address,
        Email,
        phoneno,
        
       
    })

    newSeller.save().then(()=>{
        res.json("Seller Added")
    }).catch((err) => {
        console.log(err);
    })
})



router.route("/update-Seller/:id").put(async (req, res) => {
    let Seller_id = req.params.id;
    const {
        name,
        address,
        Email,
        phoneno,
       
    } = req.body;

    const updateSeller = {
        name,
        address,
        Email,
        phoneno,
    }

    const update = await SellerSchema.findByIdAndUpdate(Seller_id, updateSeller)
        .then(() => {
            res.status(200).send({ status: "Seller updated..." })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})

router.route("/delete-Seller/:id").delete(async(req, res) => {
        const update = await SellerSchema.findByIdAndUpdate(Seller_id, updateSeller)
            .then(() => {
                res.status(200).send({ status: "Seller updated..." })
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
router.delete("/delete-Seller/:id", async(req, res) => {
    let Seller_id = req.params.id;

    //console.log(driver_id)wwdd

    await SellerSchema.deleteOne({ _id: Seller_id })
        .then(() => {
            res.status(200).send({
                status: "Seller deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Seller", error: err.message });
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
const express = require('express')
const router = express.Router()
const logingSchema  = require("../models/loging")
const { loging } = require('./loging')

router.get("/get-loging" , async(req,res)=>{
    let loging = logingnSchema.find({} , function(err , result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({result})
        }
    })
})

router.route("/add-loging").post((req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const Email = req.body.Email;
    const phoneno = req.body.phoneno;
    

    const newloging = new logingSchema({
        name,
        password,
        Email,
        phoneno,
  
       
    })

    newloging.save().then(()=>{
        res.json("loging Added")
    }).catch((err) => {
        console.log(err);
    })
})



router.route("/update-loging/:id").put(async (req, res) => {
    let loging_id = req.params.id;
    const {
        name,
        password,
        Email,
        phoneno,
  
       
    } = req.body;

    const updateloging = {
        name,
        password,
        Email,
        phoneno,
  
       
    }

    const update = await logingSchema.findByIdAndUpdate(loging_id, updateloging)
        .then(() => {
            res.status(200).send({ status: "admin updated..." })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})

router.route("/delete-loging/:id").delete(async(req, res) => {
        const update = await logingSchema.findByIdAndUpdate(loging_id, updateloging)
            .then(() => {
                res.status(200).send({ status: "loging updated..." })
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
router.delete("/delete-loging/:id", async(req, res) => {
    let loging_id = req.params.id;

    //console.log(driver_id)wwdd

    await logingSchema.deleteOne({ _id: loging_id })
        .then(() => {
            res.status(200).send({
                status: "loging deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete loging", error: err.message });
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
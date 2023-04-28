const express = require('express')
const router = express.Router()
const OrderSchema  = require("../models/Order")
const { Order } = require('./Order')

router.get("/get-Order" , async(req,res)=>{
    let Order = OrderSchema.find({} , function(err , result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({result})
        }
    })
})

router.route("/add-Order").post((req, res) => {
    const contactNO = req.body.contactNO;
    const address = req.body.address;
    const date = req.body.date;
    const area = req.body.area;
    const orderID = req.body.orderID;
    const total = req.body.total;
    const nItems = req.body.nItems;
    const Quantity = req.body.Quantity;

    const Amount = req.body.Amount;
    const category = req.body.category;
    const user = req.body.user;
    

    const newOrder = new OrderSchema({
        contactNO,
        address,
        date,
        area,
        orderID,
        total,
        nItems,
        Quantity,

        Amount,
        category,
        user,
       
    })

    newOrder.save().then(()=>{
        res.json("Order Added")
    }).catch((err) => {
        console.log(err);
    })
})



router.route("/update-Order/:id").put(async (req, res) => {
    let Order_id = req.params.id;
    const {
        contactNO,
        address,
        date,
        area,
        orderID,
        total,
        nItems,
        Quantity,

        Amount,
        category,
        user,
       
    } = req.body;

    const updateOrder = {
        contactNO,
        address,
        date,
        area,
        orderID,
        total,
        nItems,
        Quantity,

        Amount,
        category,
        user,
       
    }

    const update = await OrderSchema.findByIdAndUpdate(Order_id, updateOrder)
        .then(() => {
            res.status(200).send({ status: "Order updated..." })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})

router.route("/delete-Order/:id").delete(async(req, res) => {
        const update = await OrderSchema.findByIdAndUpdate(Order_id, updateOrder)
            .then(() => {
                res.status(200).send({ status: "Order updated..." })
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
router.delete("/delete-Order/:id", async(req, res) => {
    let Order_id = req.params.id;

    //console.log(driver_id)wwdd

    await OrderSchema.deleteOne({ _id: Order_id })
        .then(() => {
            res.status(200).send({
                status: "Order deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Order", error: err.message });
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
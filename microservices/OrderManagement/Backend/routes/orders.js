const router = require("express").Router();
let CustomerOrder = require("../models/order");


router.route('/add').post( async(req,res)=>{

    const newCustomerOrder = new CustomerOrder({
        items: req.body.items,
        nItems: req.body.nItems,
        orderID: req.body,
        name: req.body.name,
        address: req.body.address,
        contactNO: req.body.contactNO,
        area: req.body.area,
        total: req.body.total
        
    })

    const totalNumberOfProductInDb = await CustomerOrder.countDocuments();

    let numberToString = totalNumberOfProductInDb.toString();


    if(numberToString.length < 5){
    
        for (let i = numberToString.length; i < 3; i++){

            numberToString = '0' + numberToString

        }

    }

    newCustomerOrder.orderID = `OD${numberToString}`

    newCustomerOrder.save().then(()=>{
        res.json("Order added");
    }).catch((err)=>{
        console.log(err);
    })

})



router.route("/").get((req,res)=>{
    CustomerOrder.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/:id").get(async(req,res)=>{

    let orderId = req.params.id;

    const order = await CustomerOrder.findById(orderId).then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    })
})

router.route("/update/:ID").put(async(req,res)=>{
    let orderId = req.body.ID;
    const {address} = req.body;
    const {contactNO} = req.body;
    const {quantity} = req.body;

    const Update = {
        address,
        contactNO,
        quantity,
    }

    const update = await CustomerOrder.findByIdAndUpdate(orderId, Update).then(()=>{
        res.status(200).send({status: "Order updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating order", error: err.message});
    })
})



router.route("/delete/:id").delete(async(req,res)=>{
    var orderId = req.params.id;

    await CustomerOrder.findByIdAndRemove(orderId).exec().then(()=>{
        res.json("Order deleted")
        
    }).catch((err)=>{
        res.status(500).send({status: "Error with deleting order", error: err.message});
    })
})






module.exports = router;
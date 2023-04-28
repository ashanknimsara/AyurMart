const express = require('express')
const router = express.Router()
const ProductSchema  = require("../models/Product")
const { Product } = require('./Product')

router.get("/get-Product" , async(req,res)=>{
    let Product = ProductSchema.find({} , function(err , result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({result})
        }
    })
})

router.route("/add-Product").post((req, res) => {
    const productID = req.body.productID;
    const productName = req.body.productName;
    const category = req.body.category;
    const date = req.body.date;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const unit = req.body.unit;
    const image = req.body.image;
   
    

    const newProduct = new ProductSchema({
        productID,
        productName,
        category,
        date,

        price,
        quantity,
        unit,
        image,
        
       
    })

    newProduct.save().then(()=>{
        res.json("Product Added")
    }).catch((err) => {
        console.log(err);
    })
})


//644ade82b5626a4300bcd436
router.route("/update-Product/:id").put(async (req, res) => {
    let Product_id = req.params.id;
    const {
        productID,
        productName,
        category,
        date,

        price,
        quantity,
        unit,
        image,
       
    } = req.body;

    const updateProduct = {
        productID,
        productName,
        category,
        date,

        price,
        quantity,
        unit,
        image,
    }

    const update = await ProductSchema.findByIdAndUpdate(Product_id, updateProduct)
        .then(() => {
            res.status(200).send({ status: "Product updated..." })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        })
})



router.delete("/delete-Product/:id", async(req, res) => {
    let Product_id = req.params.id;



    await ProductSchema.deleteOne({ _id: Product_id })
        .then(() => {
            res.status(200).send({
                status: "Product deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete Seller", error: err.message });
        })
})


module.exports = router;
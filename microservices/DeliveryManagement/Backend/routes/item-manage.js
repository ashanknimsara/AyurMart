const express = require('express')
const  mongoose = require('mongoose')
const router = express.Router()
const ItemSchema = require("../models/Item")

router.get("/get-items" , async(req,res)=>{
    let items = ItemSchema.find({} , function(err , items){
        if(err){
            res.json({msg:err})
        }else{
            res.json({items})
        }
    })
})

router.post("/add-item" , async(req,res)=>{
    var item_name = req.body.item_name
    var item_category=req.body.item_category
    var quantity=req.body.quantity
    var reorder_level=req.body.reorder_level
    //var  sup_id=req.body.sup_id


    var item_category = mongoose.Types.ObjectId(item_category)
    var sup_id = mongoose.Types.ObjectId(sup_id)

    var newItem= new ItemSchema({
        item_name:item_name,
        item_category:item_category,
        quantity:quantity,
        reorder_level:reorder_level,
      //  sup_id:sup_id
    })
    newItem.save(function(err,result){
        if(err){
            res.json({msg:err})
        }else{
            res.json({mag:"item  created"})
        }   
})

})
router.delete("/delete-item/:id",async(req,res)=>{
    let item_id = req.params.id;

    //console.log(item_id)

    await ItemSchema.deleteOne({_id:item_id})
    .then(()=>{
        res.status(200).send({
            status:"item deleted"
        });
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete item",error :err.message});
    })
})
router.put("/update-item/:id" , async(req,res)=>{
    let item_id = req.params.id;
    var itemname = req.body.itmname
    var ItemCategory=req.body.itmcat
    var quantity=req.body.itmquant
    var reorder_level=req.body.itmreorder
   // var  sup_id=req.body.itmsup

    var catId = mongoose.Types.ObjectId(ItemCategory)
    var supId = mongoose.Types.ObjectId(sup_id)
    var newRequest= new  ItemSchema({
        _id:item_id,
        item_name:itemname,
        category_name:catId,
        quantity:quantity,
        reorder_level:reorder_level,
       // sup_id:supId
    })
    ItemSchema.updateOne({_id:item_id},newRequest)
    .then(()=>{
        res.status(200).send({
            status:"item update"
        });
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with updated item",error :err.message});
    })
})
module.exports = router;
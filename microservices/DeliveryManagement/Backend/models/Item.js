const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    
    item_name:{
        type:String,
        required:true
    },
    item_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    quantity:{
        type:String,
        required:true,
        unique:true
    },
    reorder_level:{
        type:String,
        required:true
    },
    sup_id:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true,
    },
    
   
})

module.exports = mongoose.model("Item" , ItemSchema)

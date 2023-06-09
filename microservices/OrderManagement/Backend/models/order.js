const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({


    contactNO:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        
    },
    date:{
        type:Date,
        required:true,
        
    },
    area:{
        type:String,
        required:true
    },
    orderID:{
        type:String,
        required:true,
    },
    total:{
        type:String,
        required:true,
    },
    nItems:{
        type:String,
        required:true
    },
    Quantity:{
        type:String,
        required:true
    },
    Amount:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
   
    
})

module.exports = mongoose.model('Order' ,OrderSchema )
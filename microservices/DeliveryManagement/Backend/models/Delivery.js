const mongoose = require("mongoose");


const DeliverySchema = new mongoose.Schema({


    cusName:{
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
    driverName:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true,
    },
    nic:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true
    },
    deliveryStatus:{
        type:String,
        required:true
    },
   
    
})

module.exports = mongoose.model('Delivery' ,DeliverySchema )
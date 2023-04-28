const mongoose = require("mongoose");


const SellerSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        
    },
    Email:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true,
    },
 
   
    
})

module.exports = mongoose.model('Seller' ,SellerSchema )
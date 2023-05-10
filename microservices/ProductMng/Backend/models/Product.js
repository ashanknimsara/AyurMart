const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({


    productID: {
        type:String,
        
    },
    productName : {
        type : String,
        required : true,
        unique: true,

    },
    category : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    unit : {
        type: String,
        required: true
    },
    image : {
        type : String,
        required : true,
        unique : true
    },
    
   
    
})

module.exports = mongoose.model('Product' ,ProductSchema )
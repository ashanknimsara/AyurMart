const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    ID : {
        type : String,
    },
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
    }
    

    
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;
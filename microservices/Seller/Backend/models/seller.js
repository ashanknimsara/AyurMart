//import mongoose package
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    sellerID: {
        type:String
    },
    name : {
        type : String,
        required: true
    },
     gender:{
        type:String,
        required:true
    },
     address:{
        type:String,
        required:true
    },
    birthday:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
   
   
})

//move the details in scheema to data base
const seller = mongoose.model("seller",sellerSchema);

 // use you logic to generate the _id

module.exports = seller;
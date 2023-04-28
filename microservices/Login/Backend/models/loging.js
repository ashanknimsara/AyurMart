const mongoose = require("mongoose");


const logingSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    password:{
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

module.exports = mongoose.model('loging' ,logingSchema )
const mongoose = require("mongoose");


const PaymentSchema = new mongoose.Schema({


    cardName:{
        type:String,
        required:true
    },
    cardNumber:{
        type:String,
        required:true,
        
    },
    expiry:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true,
    },

    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
        
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
        
    },
    IDOrder:{
        type:String,
        required:true
    },
    payID:{
        type:String,
        required:true,
    },
 
 
   
    
})

module.exports = mongoose.model('Payment' ,PaymentSchema )
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerOrderSchema = new Schema({

    ID : {
        type : String,
    },
    address : {
        type: String,
        required: true
    },
    contactNO : {
        type: Number,
        required: true
        
    },
    area : {
        type: String,
        required: true,
    },
    orderID : {
        type: String,
    },
    name : {
        type: String
    },
    total : {
        type: Number
    },
    items : [{
        type: String
    }],
    nItems : [{
        type: Number
    }]

    
})

const CustomerOrder = mongoose.model("CustomerOrder",customerOrderSchema);

module.exports = CustomerOrder;
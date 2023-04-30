const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    card_name : {
        type: String,
        required: true
    },
    card_number : {
        type: Number,
        required: true
    },
    expiry : {
        type: String,
        required: true
    },
    cvv : {
        type: Number,
        required: true
    },
    street : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    zip : {
        type: Number,
        required: true
    },
    amount : {
        type: Number
    },
    IDOrder : {
        type: String
    },
    payID : {
        type: String
    }
})

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = Payment;
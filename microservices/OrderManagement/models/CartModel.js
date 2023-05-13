const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  productImage: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter your product quantity"],
  },
  user_Id: {
    type: String,
    required: true,
  },
  seller_Id: {
    type: String,
    required: true,
  },
  order_Id: {
    type: String,
    required: true,
  },
  order_status: {
    type: String,
    required: true,
  },
 });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = { Cart };

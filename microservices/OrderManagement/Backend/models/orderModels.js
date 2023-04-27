const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    Quantity: {
      type: String,
      required: true,
    },


    Amount: {
      type: String,
      required: true,
    },

    
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

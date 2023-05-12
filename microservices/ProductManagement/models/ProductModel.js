const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productImage: { type: String, required: true },
    sellerId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);

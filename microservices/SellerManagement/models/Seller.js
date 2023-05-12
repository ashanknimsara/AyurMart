const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String }
});

const Seller = mongoose.model('User', sellerSchema);

module.exports = Seller;

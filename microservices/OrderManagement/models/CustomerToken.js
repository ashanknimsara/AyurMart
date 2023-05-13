const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  token: {
    type: String,
    required: true,
  },

  _customerId: {
    type: Schema.Types.ObjectId,
    ref: "customers",
  },

  tokenType: {
    type: String,
    enum: ["ADMIN", "USER"],
  },
});

const CustomerToken = mongoose.model("token", tokenSchema);
module.exports = { CustomerToken };

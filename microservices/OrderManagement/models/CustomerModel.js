const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissionLevel: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = { Customer };

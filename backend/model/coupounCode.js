const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your  coupounCode  name!"],
    unique: true,
  },
  value: {
    type: Number, // like 2% 3%
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
 shopId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Shop",
  required: true,
},

  selectedProduct: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);

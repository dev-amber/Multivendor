const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  seller: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing", // iyyt req send then process and then complete it success status
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);

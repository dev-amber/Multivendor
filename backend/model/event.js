const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your  event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event  product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your  event product category!"],
  },
  start_Date: {
    type: Date,
    required: true,
  },
  Finish_Date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  tags: {
    type: String,
    required: [true, "Please enter your event  product tags!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: String,
    required: [true, "Please enter your product   price!"],
  },
  stock: {
    type: String,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true, // seperate shop bcz anyone access and create shop so shop seperate used
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);

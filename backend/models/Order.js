const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress1: {
    type: String,
    required: [true, "A shipping address is required"],
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "City field is required"],
  },
  zip: {
    type: String,
    required: [true, "Zip field is required"],
  },
  country: {
    type: String,
    required: [true, "Country field is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone field is required"],
  },
  status: {
    type: String,
    default: "Pending",
  },
  totalPrice: {
    type: String,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", OrderSchema);

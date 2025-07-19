const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  hasDrink: Boolean,
  quantity: Number,
});

const CartItemSchema = new mongoose.Schema({
  product: ProductSchema,
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    items: [CartItemSchema],
    total: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

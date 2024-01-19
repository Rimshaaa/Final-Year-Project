import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    item_name: String,
    item_image: String,
    price: String,
    qty: String,
    unit: String,
    description: String,
    inventory_id: String,
    email: String,
    address: String,
    country: String,
    first_name: String,
    last_name: String,
    city: String,
    postal_code: Number,
    phone: String,
    status: { type: String, default: "pending" },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("order", orderSchema);

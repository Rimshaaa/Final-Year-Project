import mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: String,
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier_category",
    },
    price: String,
    qty: String,
    offer_price: String,
    description: String,
    unit: String,
    inventory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inventory",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("item", ItemSchema);

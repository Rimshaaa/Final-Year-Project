import mongoose from "mongoose";

export const bidSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier_category",
    },
    item_name: String,
    price: String,
    qty: String,
    unit: String,
    details: String,
    location: {},
    status: { type: String, default: "open" },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bidders: [
      {
        bid_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        bid_price: String,
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Bid = mongoose.model("bid", bidSchema);

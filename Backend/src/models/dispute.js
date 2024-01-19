import mongoose from "mongoose";

export const disputeSchema = new mongoose.Schema(
  {
    restaurant_name: String,
    restaurant_email: String,
    supplier_name: String,
    supplier_email: String,
    description: String,
    files: [],
  },
  {
    timestamps: true,
  }
);

export const Dispute = mongoose.model("dispute", disputeSchema);

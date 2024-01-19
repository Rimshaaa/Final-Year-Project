import mongoose from "mongoose";

export const contractSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    details: String,
    terms: String,
    res_sign: String,
    sup_sign: String,
    startDate: String,
    endDate: String,
    status: {
      type: String,
      default: "pending",
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

export const Contract = mongoose.model("contract", contractSchema);

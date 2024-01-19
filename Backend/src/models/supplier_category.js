import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const supplierCategory = mongoose.model(
  "supplier_category",
  supplierSchema
);

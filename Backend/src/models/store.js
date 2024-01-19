import mongoose from "mongoose";
import { ItemSchema } from "./item.js";

const storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  store_type: String,
  address: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  items: [ItemSchema],
  is_active: {
    type: Boolean,
    default: true,
  },
});

export const Store = mongoose.model("store", storeSchema);

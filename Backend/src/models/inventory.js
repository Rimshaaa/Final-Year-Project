import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: String,
    image: String,
    cat_id: String,
    items: [
      {
        name: String,
        image: String,
        items: String,
        name: String,
        rating: String,
        qty: String,
        unit: String,
        price: String,
        isTopOfTheWeek: String,
        image: String,
        size: String,
        crust: String,
        delivery: String,
        category_id: String,
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

export const Inventory = mongoose.model("inventory", InventorySchema);

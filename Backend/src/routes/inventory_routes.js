import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  CreateCategory,
  CreateItem,
  DeleteItem,
  GetInventory,
  UpdateItem,
} from "../controllers/inventory_controller.js";

routes.get("/get_inventory", protect, GetInventory);
routes.post("/create_category", protect, CreateCategory);
routes.post("/add_item", protect, CreateItem);
routes.delete("/delete_item/:inventoryId/:itemId", protect, DeleteItem);
routes.put("/update_item", protect, UpdateItem);

export default routes;

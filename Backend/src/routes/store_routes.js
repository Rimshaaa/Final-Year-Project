import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";

import {
  AddStoreItem,
  CreateStore,
  DeleteStore,
  DeleteStoreItem,
  GetStoreByUser,
  GetSuppliers,
  UpdateStoreItem,
  updateStore,
} from "../controllers/store_controller.js";

routes.get("/get_store", protect, GetStoreByUser);
routes.post("/create_store", protect, CreateStore);
routes.put("/update_store/:_id", protect, updateStore);
routes.delete("/delete_store/:_id", protect, DeleteStore);
// Items In Store
routes.post("/store/:storeId/item", AddStoreItem);
routes.put("/store/:storeId/item/:itemId", UpdateStoreItem);
routes.delete("/store/:storeId/item/:itemId", DeleteStoreItem);

// Get Suppliers
routes.get("/get_suppliers", GetSuppliers);

export default routes;

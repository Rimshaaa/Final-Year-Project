import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  DeleteAccount,
  GetContracts,
  GetFeaturedInfo,
  GetOrders,
  GetRestaurants,
  GetSuppliers,
  GetUsers,
  getUserStatistics,
} from "../controllers/admin_controller.js";

routes.get("/admin_suppliers", protect, GetSuppliers);
routes.get("/admin_restaurants", protect, GetRestaurants);
routes.delete("/admin_delete/:id", protect, DeleteAccount);
routes.get("/user_analytics", getUserStatistics);
routes.get("/admin_contracts", GetContracts);
routes.get("/admin_orders", GetOrders);
routes.get("/featured_info", GetFeaturedInfo);
routes.get("/admin_approvel", GetUsers);

export default routes;

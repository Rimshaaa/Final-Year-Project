import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  CreateCheckout,
  CreateOrder,
  GetOrderByUser,
  GetSupplierOrders,
  OrdersCount,
  UpdateOrder,
} from "../controllers/order_controller.js";

routes.post("/create_order", CreateOrder);
routes.post("/checkout", CreateCheckout);
routes.get("/get_orders", protect, GetOrderByUser);
routes.get("/orders_count", OrdersCount);
routes.get("/get_sup_orders", protect, GetSupplierOrders);
routes.put("/update_order", UpdateOrder);

export default routes;

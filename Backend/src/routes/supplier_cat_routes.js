import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  supplierCategory_Create,
  supplierCategory_Delete,
  supplierCategory_Get,
  supplierCategory_Update,
} from "../controllers/supplier_cat_controller.js";

routes.post("/supplier_cat_create", protect, supplierCategory_Create);
routes.put("/supplier_cat_update/:_id", protect, supplierCategory_Update);
routes.get("/supplier_cat", supplierCategory_Get);
routes.delete("/supplier_cat_delete/:_id", protect, supplierCategory_Delete);

export default routes;

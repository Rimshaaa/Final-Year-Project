import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  CreateDispute,
  GetDisputes,
} from "../controllers/dispute_controller.js";

routes.post("/create_dispute", CreateDispute);
routes.get("/get_disputes", GetDisputes);

export default routes;

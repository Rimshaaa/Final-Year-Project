import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  CreateContract,
  GetContractByUser,
  UpdateContract,
} from "../controllers/contract_controller.js";

routes.post("/create_contract", CreateContract);
routes.put("/update_contract", UpdateContract);
routes.get("/get_contracts", protect, GetContractByUser);

export default routes;

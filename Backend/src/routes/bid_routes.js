import express from "express";
import {
  CreateBidItem,
  GetBidders,
  GetBidsAll,
  GetBidsByUser,
  PlaceBid,
  updateBid,
} from "../controllers/bid_controller.js";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";

routes.get("/get_bids", protect, GetBidsByUser);
routes.get("/get_bidders/:_id", GetBidders);
routes.get("/get_bids_all", GetBidsAll);
routes.post("/create_bid_item", protect, CreateBidItem);
routes.post("/place_bid/:id", protect, PlaceBid);
routes.put("/update_bid", updateBid);

export default routes;

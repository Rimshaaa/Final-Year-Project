import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as socketIo } from "socket.io";

dotenv.config();
import "./config.js";
import Auth from "./routes/auth_routes.js";
import Inventory from "./routes/inventory_routes.js";
import Store from "./routes/store_routes.js";
import SupplierCategory from "./routes/supplier_cat_routes.js";
import Bid from "./routes/bid_routes.js";
import Order from "./routes/order_routes.js";
import Contract from "./routes/contract_routes.js";
import Admin from "./routes/admin_routes.js";
import Dispute from "./routes/dispute_routes.js";
import MessageRoutes from "./routes/message_routes.js";
import { Message } from "./models/message.js";

const app = express();

const server = http.createServer(app);
const io = new socketIo(server);

//middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("public"));

//All APi's Endponits
app.use(
  "/api/v1",
  Auth,
  Inventory,
  MessageRoutes,
  Store,
  SupplierCategory,
  Bid,
  Order,
  Contract,
  Dispute,
  Admin
);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Backend is runing..",
  });
});

//REAL TIME CHAT
io.on("connection", (socket) => {
  // console.log("User connected to socket:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("message", async (roomId, message) => {
    try {
      const newMessage = new Message({
        senderId: message.senderId,
        recepientId: message.recepientId,
        messageType: message.messageType,
        message: message.messageText,
        terms: message.messageTerms,
        contractId: message.contractId,
        timestamp: new Date(),
        imageUrl: message.messageType === "image" ? message.imageUrl : null,
        startDate: message.startDate,
        endDate: message.endDate,
      });
      io.to(roomId).emit("message", newMessage);
      await newMessage.save();
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

//Port
const port = process.env.PORT || 3333;
const nodeServer = server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

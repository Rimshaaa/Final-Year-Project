import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  recepientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  messageType: {
    type: String,
    enum: ["text", "image", "contract", "order", "dispute", "receipt"],
  },
  is_read: {
    type: Boolean,
    default: false,
  },
  message: String,
  dispute_images: [],
  terms: String,
  imageUrl: String,
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract",
  },
  startDate: String,
  endDate: String,
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  order_status: String,
  delivery_date: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("message", messageSchema);

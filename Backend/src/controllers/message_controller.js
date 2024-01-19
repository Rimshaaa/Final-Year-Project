import { Message } from "../models/message.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.js";
import mongoose from "mongoose";

export const postMessage = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.body.messageType === "image") {
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            } else {
              imageUrl = result.secure_url;
              resolve();
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });
    }

    const newMessage = new Message({
      ...req.body,
      timestamp: new Date(),
      imageUrl: req.body.messageType === "image" ? imageUrl : null,
    });

    await newMessage.save();
    res.status(200).json({ message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recepientId = await User.findById(userId);

    res.json(recepientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchMessages = async (req, res) => {
  try {
    const { senderId, recepientId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    });

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMessages = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "invalid req body!" });
    }

    await Message.deleteMany({ _id: { $in: messages } });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const recepientId = req.params.recepientId;

    const deleteResult = await Message.deleteMany({
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    });

    res.json({
      message: `${deleteResult.deletedCount} messages deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const friendsChat = async (req, res) => {
  const userId = req.params.userId;

  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: new mongoose.Types.ObjectId(userId) },
            { recepientId: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] },
              then: "$recepientId",
              else: "$senderId",
            },
          },
          lastMessage: { $first: "$$ROOT" },
        },
      },
      {
        $addFields: {
          userId: "$_id",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: { $toString: "$_id" },
          userId: 1,
          messageType: "$lastMessage.messageType",
          message: "$lastMessage.message",
          imageUrl: "$lastMessage.imageUrl",
          timeStamp: "$lastMessage.timeStamp",
          senderId: {
            _id: "$lastMessage.senderId",
            name: "$userDetails.name",
            image: "$userDetails.image",
          },
          recepientId: {
            _id: "$lastMessage.recepientId",
            name: "$userDetails.name",
            image: "$userDetails.image",
          },
          __v: "$lastMessage.__v",
        },
      },
    ]);
    const sorted = messages.sort((a, b) => a.timeStamp - b.timeStamp);
    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the user's connections
    const user = await User.findById(userId).populate({
      path: "connections",
      select: "name image",
      model: User,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const connectionsWithoutMessages = [];

    for (const connection of user.connections) {
      const lastMessage = await Message.findOne({
        $or: [
          { senderId: user._id, recepientId: connection._id },
          { senderId: connection._id, recepientId: user._id },
        ],
      });

      if (!lastMessage) {
        connectionsWithoutMessages.push({
          name: connection.name,
          _id: connection._id,
          image: connection.image,
          lastMessage: "Empty Chat, Join Now",
        });
      }
    }

    res.json(connectionsWithoutMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUnread = async (req, res) => {
  try {
    const unreadMessages = await Message.countDocuments({
      recepientId: req.user._id,
      is_read: false,
    });

    res.json(unreadMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const markAllMessagesAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;
    const recepientId = req.user._id;

    const result = await Message.updateMany(
      { senderId: senderId, recepientId: recepientId },
      { $set: { is_read: true } }
    );

    res.json({
      message: "All messages marked as read",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

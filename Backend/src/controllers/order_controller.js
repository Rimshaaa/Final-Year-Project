import { Bid } from "../models/bid.js";
import { Order } from "../models/order.js";
import { Store } from "../models/store.js";
import { Inventory } from "../models/inventory.js";
import { Message } from "../models/message.js";

export const CreateOrder = async (req, res) => {
  try {
    const created = await Order.create({ ...req.body });
    if (created) {
      const inventory = await Inventory.findById(req.body.inventory_id);
      if (inventory) {
        inventory?.items?.map((item) => {
          if (item.image === req.body.item_image) {
            if (Number(item.qty > 0)) {
              item.qty = Number(item.qty) - Number(req.body.qty);
            }
          }
          return item;
        });
        await inventory.save();
      }
      return res
        .status(200)
        .json({ message: "Created successfully", order: created });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create order" });
  }
};

export const CreateCheckout = async (req, res) => {
  try {
    const orders = req.body.orders;
    await Promise.all(
      orders.map(async (orderData) => {
        const createdOrder = await Order.create(orderData);
        const inventory = await Inventory.findById(createdOrder.inventory_id);
        if (inventory) {
          inventory?.items?.map((item) => {
            if (item.image === createdOrder.item_image) {
              if (Number(item.qty > 0)) {
                item.qty = Number(item.qty) - Number(createdOrder.qty);
              }
            }
            return item;
          });
          await inventory.save();
        }
        const newMessage = new Message({
          senderId: createdOrder.receiver,
          recepientId: createdOrder.sender,
          messageType: "receipt",
          message: createdOrder.item_name,
          terms: createdOrder.price,
          timestamp: new Date(),
          startDate: createdOrder.qty,
          endDate: createdOrder._id,
          order_status: createdOrder.phone,
          delivery_date: createdOrder.address,
        });

        await newMessage.save();
        return createdOrder;
      })
    );
    return res.status(200).json({ message: "Orders created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create orders" });
  }
};

export const UpdateOrder = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Order.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Updated successfully", order: result });
    } else {
      res.status(200).json({ error: "Error while updating" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetOrderByUser = async (req, res) => {
  try {
    const result = await Order.find({ receiver: req.user._id })
      .populate("sender", "_id name image")
      .populate("receiver", "_id name image")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const OrdersCount = async (req, res) => {
  try {
    const result = await Order.countDocuments();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetSupplierOrders = async (req, res) => {
  try {
    const result = await Order.find({ sender: req.user._id })
      .populate("sender", "_id name image")
      .populate("receiver", "_id name image")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

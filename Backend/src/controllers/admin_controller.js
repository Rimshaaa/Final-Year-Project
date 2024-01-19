import { Store } from "../models/store.js";
import { User } from "../models/user.js";
import { Contract } from "../models/contract.js";
import { Order } from "../models/order.js";

export const GetSuppliers = async (req, res) => {
  try {
    const response = await User.find({ role: "supplier" }).sort({
      createdAt: -1,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetRestaurants = async (req, res) => {
  try {
    const response = await User.find({ role: "restaurant" }).sort({
      createdAt: -1,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const DeleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Store.findOneAndDelete({ created_by: req.params.id });
    res.status(200).json({ message: "Accound deletion success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const getUserStatistics = async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const userRegistrations = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const response = monthNames.map((name, index) => {
      const count =
        userRegistrations.find((data) => data._id === index + 1)?.count || 0;
      return {
        name,
        Accounts: count,
      };
    });

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
};

export const GetContracts = async (req, res) => {
  try {
    const response = await Contract.find()
      .sort({
        createdAt: -1,
      })
      .populate({ path: "sender", select: "name image email" })
      .populate({ path: "receiver", select: "name image email" });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetOrders = async (req, res) => {
  try {
    const response = await Order.find()
      .sort({
        createdAt: -1,
      })
      .populate({ path: "sender", select: "name image email" })
      .populate({ path: "receiver", select: "name image email" });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetFeaturedInfo = async (req, res) => {
  try {
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);

    const currentMonthEnd = new Date();
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    let users = {};
    let orders = {};
    let contracts = {};

    const userCounts = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
        },
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const orderCounts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const contractCounts = await Contract.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const contractToCheck = ["pending", "accepted", "rejected"];
    const userToCheck = ["restaurant", "supplier"];
    const orderToCheck = ["pending", "dispatched", "received"];

    userToCheck.forEach((status) => {
      users[status] = 0;
    });
    userCounts.forEach((entry) => {
      if (entry._id !== "admin") {
        users[entry._id] = entry.count;
      }
    });

    orderToCheck.forEach((status) => {
      orders[status] = 0;
    });
    orderCounts.forEach((entry) => {
      orders[entry._id] = entry.count;
    });

    contractToCheck.forEach((status) => {
      contracts[status] = 0;
    });
    contractCounts.forEach((entry) => {
      contracts[entry._id] = entry.count;
    });

    res.status(200).json({ orders, users, contracts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetUsers = async (req, res) => {
  try {
    const response = await User.find({
      is_approved: false,
      is_rejected: false,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

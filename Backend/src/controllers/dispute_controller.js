import { Contract } from "../models/contract.js";
import { Dispute } from "../models/dispute.js";
import { User } from "../models/user.js";

export const CreateDispute = async (req, res) => {
  const { supplier_email } = req.body;
  try {
    const is_exists = await User.findOne({
      email: supplier_email,
      role: "supplier",
    });
    if (!is_exists) {
      return res.status(400).json({ error: "No Supplier Found" });
    }
    const created = await Dispute.create({ ...req.body });
    if (created) {
      return res
        .status(200)
        .json({
          message: "Submitted successfully",
          data: { ...created, senderId: is_exists._id },
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create dispute" });
  }
};

export const GetDisputes = async (req, res) => {
  try {
    const result = await Dispute.aggregate([
      {
        $group: {
          _id: "$supplier_email",
          disputes: { $push: "$$ROOT" },
          supplier_name: { $first: "$supplier_name" },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

import { Contract } from "../models/contract.js";

export const CreateContract = async (req, res) => {
  try {
    const created = await Contract.create({ ...req.body });
    if (created) {
      return res
        .status(200)
        .json({ message: "Created successfully", data: created });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create contract" });
  }
};

export const UpdateContract = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Contract.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Updated successfully", data: result });
    } else {
      res.status(403).json({ error: "Error while updating" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetContractByUser = async (req, res) => {
  try {
    const result = await Contract.find({ receiver: req.user._id })
      .populate("sender", "_id name image")
      .populate("receiver", "_id name image");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

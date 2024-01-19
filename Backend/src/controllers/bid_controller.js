import { Bid } from "../models/bid.js";
import { Item } from "../models/item.js";
import { Store } from "../models/store.js";

export const CreateBidItem = async (req, res) => {
  const { _id } = req.user._id;
  try {
    const created = await Bid.create({ ...req.body, created_by: _id });
    if (created) {
      return res
        .status(200)
        .json({ message: "Created successfully", store: created });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Faild to create store" });
  }
};

export const updateBid = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Bid.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Updated successfully" });
    } else {
      res.status(200).json({ error: "Error while updating" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetBidsByUser = async (req, res) => {
  try {
    const result = await Bid.find({ created_by: req.user._id })
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetBidders = async (req, res) => {
  try {
    const result = await Bid.findOne({ _id: req.params._id })
      .populate("bidders.bid_by", "name image location address")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(result.bidders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};
export const GetBidsAll = async (req, res) => {
  try {
    const result = await Bid.find()
      .populate("category")
      .populate("created_by", "name image")
      .sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const DeleteStore = async (req, res) => {
  const { _id } = req.params;

  try {
    await Store.findByIdAndDelete({ _id });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const PlaceBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).json({ error: "Item not found" });
    }
    bid.bidders.push({ bid_by: req.user._id, bid_price: req.body.bid_price });
    await bid.save();
    return res.status(200).json({ message: "Added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const DeleteStoreItem = async (req, res) => {
  const itemId = req.params.itemId;
  const storeId = req.params.storeId;
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    const removedItem = store.items.filter(
      (item) => item._id.toString() !== itemId
    );
    store.items = removedItem;
    await store.save();
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetSuppliers = async (req, res) => {
  const categoryId = req.query.categoryId;
  try {
    const response = await Store.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
    ]);
    const filterItems = response.filter(
      (item) => item.items.category.toString() === categoryId
    );
    const mergedArray = filterItems.reduce((acc, curr) => {
      const existingEntry = acc.find((entry) => entry.name === curr.name);
      if (existingEntry) {
        existingEntry.items.push(curr.items);
      } else {
        const newEntry = {
          name: curr.name,
          created_by: [
            { name: curr.created_by[0].name, image: curr.created_by[0].image },
          ],
          items: [curr.items],
        };
        acc.push(newEntry);
      }
      return acc;
    }, []);
    res.status(200).json(mergedArray);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

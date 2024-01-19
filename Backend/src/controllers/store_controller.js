import { Item } from "../models/item.js";
import { Store } from "../models/store.js";

export const CreateStore = async (req, res) => {
  const { _id } = req.user._id;
  try {
    const created = await Store.create({ ...req.body, created_by: _id });
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

export const updateStore = async (req, res) => {
  const { _id } = req.params;

  try {
    await Store.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export const GetStoreByUser = async (req, res) => {
  try {
    const result = await Store.findOne({ created_by: req.user._id }).populate(
      "items.category"
    );
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

export const AddStoreItem = async (req, res) => {
  try {
    const store = await Store.findOne({ created_by: req.params.storeId });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    const item = new Item({
      ...req.body,
      store: store._id,
    });

    store.items.push(item);

    await Promise.all([item.save(), store.save()]);

    return res.status(200).json({ message: "Added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const UpdateStoreItem = async (req, res) => {
  const itemId = req.params.itemId;
  const storeId = req.params.storeId;
  const { name, image, price, qty } = req.body;
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    const updatedItems = store.items.map((item) => {
      if (item._id.toString() === itemId) {
        item.name = name || item.name;
        item.image = image || item.image;
        item.price = price || item.price;
        item.qty = qty || item.qty;
      }
      return item;
    });

    store.items = updatedItems;
    await store.save();
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
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
            {
              _id: curr.created_by[0]._id,
              name: curr.created_by[0].name,
              image: curr.created_by[0].image,
              email: curr.created_by[0].email,
              phone: curr.created_by[0].phone,
              ratings: curr.created_by[0].ratings,
            },
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
